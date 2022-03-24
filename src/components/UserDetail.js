import { Avatar, Box, Grid, GridItem, Heading, Image, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import SinglePost from "./SinglePost";
import SocialProfileWithImage from "./UserProfile";

export default function UserDetail(props) {

    const loacation = useParams();
    const [id, setId] = useState('');
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const loc = useLocation();
    // const mystyle{

    // }

    const loadUserCard = (post) => {
        if (post.userId) {
            setLoading(true);

            const userDetailURL = `https://jsonplaceholder.typicode.com/users/${post.userId}`;

            fetch(userDetailURL)
                .then(res => res.json())
                .then(res => {
                    const singleUser = res;

                    setUser(singleUser);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                });
        }
    }

    // toggle = () => {
    //     this.prop = !this.prop;
    // }

    useEffect(() => {
        const postId = loacation.id;

        // console.log('postsId',postId);
        // const postUrl = `https://picsum.photos/seed/picsum/${post.id}`;

        // If we are loading from params
        if (postId) {
            setId(postId);
            setLoading(true);

            const postDetailURL = `https://jsonplaceholder.typicode.com/posts/${postId}`;

            fetch(postDetailURL)
                .then(res => res.json())
                .then(res => {
                    const singlePost = res;

                    setPost(singlePost);
                    setLoading(false);
                    loadUserCard(singlePost);
                })
                .catch(err => {
                    setLoading(false);
                });
        } else if (props.post) {
            setPost(props.post);
        }
    }, []);

    return (
        <div id={post.id || 'single-post'}>
            {/* {props.post && (
                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                    <Image src="https://bit.ly/2Z4KKcF"></Image>
                    <Heading size={2}>{props.post.title}</Heading>
                    <Text>{props.post.body}</Text>
                </Box>
            )} */}
            {loading && (
                <Spinner />
            )}
            {!loading && (loc.pathname.match('all-posts') || loc.pathname.match('top-posts') || loc.pathname.includes('search')) && post && (
                <SinglePost post={post} />
            )}
            {!loading && !(loc.pathname.match('all-posts') || loc.pathname.match('top-posts')|| loc.pathname.includes('search')) && post && (
                <SimpleGrid columns={2} spacing={2}>
                    <SinglePost post={post} />
                    {user && user.id && (
                        <SocialProfileWithImage user={user} />
                    )}
                </SimpleGrid>
            )}
        </div>
    );
}