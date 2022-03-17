import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
    const { user, loading } = useAuth();

    return (
        <Layout home>
            <section id="main">
                <h4>Dashboard</h4>
                {loading ? "Loading..." : user}
                email: {user.email}
            </section>
        </Layout>
    )
}