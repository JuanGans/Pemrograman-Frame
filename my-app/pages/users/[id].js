export async function getStaticPaths() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
  
    const paths = users.map((user) => ({
      params: { id: user.id.toString() },
    }));
  
    return { paths, fallback: false };
  }
  
  export async function getStaticProps({ params }) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
    const user = await res.json();
  
    return {
      props: { user },
    };
  }
  
  const UserDetail = ({ user }) => {
    return (
      <div>
        <h1>{user.name}</h1>
        <p>Email: {user.email}</p>
        <p>Website: {user.website}</p>
        <p>Perusahaan: {user.company.name}</p>
      </div>
    );
  };
  
  export default UserDetail;
  