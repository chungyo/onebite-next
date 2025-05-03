import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode} from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import {InferGetServerSidePropsType} from "next";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getServerSideProps = async () => {
    // 컴포넌트보다 먼저 실행. 컴포넌트에 필요한 데이터 불러오는 함수

    // 조금 더 빠르게 불러오기 위해서 Promise.all을 사용
    const [allBooks, randomBooks] = await Promise.all([
        fetchBooks(),
        fetchRandomBooks()
    ])

    return {
        props:{
            allBooks,
            randomBooks,
        }
    }
}

export default function Home({allBooks, randomBooks}:InferGetServerSidePropsType<typeof getServerSideProps>) {
    // window 같은 것은 그냥은 사용할수없고, useEffect로 사용해야한다.
  return (
      <div className={style.container}>
          <section>
              <h3>지금 추천하는 도서</h3>
              {randomBooks.map((book) => <BookItem key={book.id} {...book}/>)}
          </section>
          <section>
              <h3>등록된 모든 도서</h3>
              {allBooks.map((book) => <BookItem key={book.id} {...book}/>)}
          </section>
      </div>
  )
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}