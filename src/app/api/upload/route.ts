import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { embeddingsInstance, searchArgs } from '@/lib/openai';
import { MongoDBAtlasVectorSearch } from '@langchain/community/vectorstores/mongodb_atlas';

export async function POST(request: Request) {
    try {
        const formData: FormData = await request.formData()
        const uploadedFiles: File[] = []
        formData.forEach((value) => {
            if (value instanceof File) {
                uploadedFiles.push(value);
            }
        });

        if (uploadedFiles && uploadedFiles.length > 0) {
            // Parse the data from uploaded file
            const uploadedFile = uploadedFiles[0]
            if (uploadedFile instanceof File) {

                const directoryLoader = new DirectoryLoader("/tmp/", {
                    ".pdf": (path) => new PDFLoader(path),
                });

                const directoryDocs = (
                    await directoryLoader.load()
                ).map((doc) => {
                    const url = doc.metadata.source;
                    return {
                        pageContent: doc.pageContent,
                        metadata: { url },
                    };
                });



                const textSplitter = new RecursiveCharacterTextSplitter({
                    chunkSize: 1000,
                    chunkOverlap: 200,
                });

                const splitDocs = await textSplitter.splitDocuments(directoryDocs);

                console.log(splitDocs);



                await MongoDBAtlasVectorSearch.fromTexts(
                    splitDocs.map(doc => doc.pageContent), [],
                    embeddingsInstance,
                    searchArgs
                )

                return new Response("successfully uploaded to MongoDB", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    status: 201
                })


                // return new Response(JSON.stringify(uploadedFile), {
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     status: 201
                // })
            }
            //else {
            //     console.log('Uploaded file is not in the expected format.');
            //     return new Response("Uploaded file is not in the expected format", {
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         status: 500
            //     })
            // }
        } else {
            console.log('No files found.');
            return new Response("Uploaded file is not in the expected format", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 500
            })
        }

    } catch (error) {
        console.error('Error processing request:', error);
        // Handle the error accordingly, for example, return an error response.
        return new Response("Uploaded file is not in the expected format", {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500
        })
    }
}
