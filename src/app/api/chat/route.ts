import { LangChainAdapter, Message } from 'ai';
import { ChatOpenAI } from '@langchain/openai';
import { vectorStore } from '@/lib/openai';
import { NextResponse } from 'next/server';
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";
import { BaseMessage } from "@langchain/core/messages";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const messages: Message[] = body.messages ?? [];
        const question = messages[messages.length - 1].content;

        const llm = new ChatOpenAI({
            temperature: 0.8,
            streaming: true,
        });

        const retriever = vectorStore.asRetriever({
            k: 10,
            searchType: 'mmr',
            verbose: true,
        })


        // Contextualize question
        const contextualizeQSystemPrompt = `
        Given a chat history and the latest user question
        which might reference context in the chat history,
        formulate a standalone question which can be understood
        without the chat history. Do NOT answer the question, just
        reformulate it if needed and otherwise return it as is.`;
        const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
            ["system", contextualizeQSystemPrompt],
            new MessagesPlaceholder("chat_history"),
            ["human", "{input}"],
        ]);
        const historyAwareRetriever = await createHistoryAwareRetriever({
            llm,
            retriever,
            rephrasePrompt: contextualizeQPrompt,
        });

        // Answer question
        const qaSystemPrompt = `
        You are an assistant for question-answering tasks. Use
        the following pieces of retrieved context to answer the
        question. If you don't know the answer, just say that you
        don't know. Use three sentences maximum and keep the answer
        concise.
        \n\n
        {context}`;
        const qaPrompt = ChatPromptTemplate.fromMessages([
            ["system", qaSystemPrompt],
            new MessagesPlaceholder("chat_history"),
            ["human", "{input}"],
        ]);

        // Below we use createStuffDocuments_chain to feed all retrieved context
        // into the LLM. Note that we can also use StuffDocumentsChain and other
        // instances of BaseCombineDocumentsChain.
        const questionAnswerChain = await createStuffDocumentsChain({
            llm,
            prompt: qaPrompt,
        });

        const ragChain = await createRetrievalChain({
            retriever: historyAwareRetriever,
            combineDocsChain: questionAnswerChain,
        });

        // Usage:
        const chat_history: BaseMessage[] = [];
        const response = await ragChain.streamEvents({
            chat_history,
            input: question,
        }, {
            version: "v2"
        });

        return LangChainAdapter.toDataStreamResponse(response);
    }
    catch (e) {
        return NextResponse.json({ message: 'Error Processing' + e }, { status: 500 });
    }
}