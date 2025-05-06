import React, {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import Head from "next/head";

export const getServerSideProps = async(context: GetServerSidePropsContext) => {
    // context에는 현재 브라우저에 대한 정보가 담겨있다.
    const q = context.query.q as string;

    const books = await fetchBooks(q)

    return{
        props: {
            books,
        }
    }
}

export default function Page({books}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <div>
            <Head>
                <title>한입북스 - 검색결과</title>
                <meta property={"og:image"} content={"/thumbnail.png"} />
                <meta property={"og:title"} content={"한입북스 - 검색결과"} />
            </Head>
            {books.map((book) => <BookItem key={book.id} {...book}/>)}
        </div>
    )
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}