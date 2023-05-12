import Link from "next/link";

export default function IndexPage() {
  return (
    <div>
      とにかくここに基本機能を実装する。
      <br />
      API機能は簡潔に、キーだけ隠す感じにする。 Hello Worldkkdkkk.dddd{" "}
      認証なども後で良い。
      ここでAPIを取得してアクセスができるのか？？？
      <br />
      <Link href="/about">About</Link><br />
      <Link href="/day">Day</Link>
    </div>
  );
}
