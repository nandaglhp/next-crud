//layout
import Layout from "../../components/layout";

//import Link
import Link from "next/link";

//import axios
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

//fetch with "getServerSideProps"
export async function getServerSideProps() {
  //http request
  const req = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`);
  const res = await req.data.data.data;

  return {
    props: {
      posts: res, // <-- assign response
    },
  };
}

function PostIndex(props) {
  //destruct
  const { posts } = props;

  //router
  const router = useRouter();

  //refresh data
  const refreshData = () => {
    router.replace(router.asPath);
  };

  //function "deletePost"
  const deletePost = async (id) => {
    //sending
    await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${id}`);

    //refresh data
    refreshData();
  };

  return (
    <Layout>
      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <Link href="/posts/create">
                  <button className="btn btn-primary border-0 shadow-sm mb-3">TAMBAH</button>
                </Link>
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th scope="col">IMAGE</th>
                      <th scope="col">JUDUL</th>
                      <th scope="col">CONTENT</th>
                      <th scope="col">AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td className="text-center">
                          <Image src={`${process.env.NEXT_PUBLIC_API_BACKEND}/storage/posts/${post.image}`} width={150} height={150} className="rounded-3" alt={`Image for post ${post.id}`} unoptimized />
                        </td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td className="text-center">
                          <Link href={`/posts/edit/${post.id}`}>
                            <button className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3">EDIT</button>
                          </Link>
                          <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger border-0 shadow-sm mb-3">
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PostIndex;
