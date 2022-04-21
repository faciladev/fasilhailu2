// /pages/index.tsx
import { gql, useQuery } from "@apollo/client";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

const AllUsersQuery = gql`
  query {
    users {
      email
      projects {
        id
        description
        technology
        title
        imageUrl
        url
      }
      testimonials {
        name
        position
        imageUrl
        text
        id
      }
      skills {
        id
        title
        description
      }
    }
  }
`;

function Home() {
  const { data, loading, error } = useQuery(AllUsersQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <main className="text-gray-400 bg-gray-900 body-font">
      <Navbar />
      <About />
      <Projects projects={data.users[0].projects} />
      <Skills skills={data.users[0].skills} />
      <Testimonials testimonials={data.users[0].testimonials} />
      <Contact />
    </main>
  );
}

export default Home;
