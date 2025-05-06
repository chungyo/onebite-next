import style from "./[id].module.css";
import {
    GetStaticPropsContext,
    InferGetStaticPropsType
} from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import {useRouter} from "next/router";
import Head from "next/head";

export const getStaticPaths = async () => {
    return {
        paths:[
            {params: {id: "1"}}, // url 파라미터 값은 무조건 string 으로 설정해야 함.
            {params: {id: "2"}},
            {params: {id: "3"}},
            {params: {id: "4"}},
            {params: {id: "5"}},
        ],
        fallback: true, // true로 설정하면 없는 id를 입력했을때 404 페이지가 아닌 fallback 페이지로 이동
    }
}

export const getStaticProps = async (context: GetStaticPropsContext) =>{

    // !를 통해서 params가 무조건 있을것이라는 것을 명시
    const id = context.params!.id
    const book = await fetchOneBook(Number(id))

    if(!book){
        return {
            notFound: true, // 404 페이지로 이동
        }
    }
    return {
        props:{
            book,
        }
    }
}

export default function Page({book}: InferGetStaticPropsType<typeof getStaticProps>) {

    const router = useRouter()
    if(router.isFallback) {
        return(
            <>
                <Head>
                    <title>한입북스</title>
                    <meta property={"og:image"} content={"/thumbnail.png"} />
                    <meta property={"og:title"} content={"한입 북스에 등록된 도서들을 만나보세요!"} />
                </Head>
                <div>로딩중입니다</div>
            </>
        )
    }

    if(!book){
        return "문제가 발생했습니다. 다시 시도하세요"
    }

    const {
        title,
        subTitle,
        description,
        author,
        publisher,
        coverImgUrl,
    } = book;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property={"og:image"} content={coverImgUrl}/>
                <meta property={"og:title"} content={title}/>
                <meta property={"og:description"} content={description} />
            </Head>
            <div className={style.container}>
                <div
                    className={style.cover_img_container}
                    style={{backgroundImage: `url('${coverImgUrl}')`}}
                >
                    <img src={coverImgUrl} alt={"이미지"}/>
                </div>
                <div className={style.title}>{title}</div>
                <div className={style.subTitle}>{subTitle}</div>
                <div className={style.author}>
                    {author} | {publisher}
                </div>
                <div className={style.description}>{description}</div>
            </div>
        </>

    );
}
