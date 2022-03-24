import { Button, Grid, GridItem, Input, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import SingleData from "./SingleData";
import UserDetail from "./UserDetail";

export default function UserList() {

    const navigate = useNavigate();
    const loc = useLocation();
    const urlSearch = loc.search;
    const [searchTerm, setSearchTerm] = useState('');
    // function Redirect() {
    //     let navigate = useNavigate();
    //     function handleClick() {
    //         navigate('/home')
    //     }
    //     return (
    //         <div>
    //             <button onClick={handleClick}>go home</button>
    //         </div>
    //     );
    // }

    const [posts, setPosts] = useState([]);
    // const [topPosts, setTopPosts] = useState([]);
    // const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);

    const [id, setId] = useState('');

    useEffect(() => {

        setLoading(true);
        // setPosts([]);
        console.log('pathname', loc.pathname);
        if (loc.pathname.match('search')) {

            const userId = searchTerm ? searchTerm : new URLSearchParams(urlSearch).get('userId') || 1;

            const postsURL = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

            fetch(postsURL)
                .then(res => res.json())
                .then(res => {
                    const posts = res;
                    setPosts(posts);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                });

        } else if (loc.pathname.includes('top-posts')) {
            // setPosts([]);
            const topNumbers = [1, 5, 45, 50, 65, 100];

            // console.log('Number of Top-Post',topNumbers.length);
            // console.log('Show top posts');

            // const topPostsLocal = [];

            // const postPromises = [];

            // topNumbers.forEach((numb,index) => {
            // console.log('Post id',numb);
            // let index = 0;

            const postPromises = topNumbers.map(numb => {
                const postDetailURL = `https://jsonplaceholder.typicode.com/posts/${numb}`;
                return fetch(postDetailURL)
                    .then(res => res.json());
            });

            Promise.all(postPromises)
                .then(postResults => {
                    setPosts(postResults);
                    setLoading(false);
                })
                .catch(err => setLoading(false));


            // for(const numb of topNumbers) {
            //     const postDetailURL = `https://jsonplaceholder.typicode.com/posts/${numb}`;

            // const postPromise = fetch(postDetailURL);
            // postPromises.push(postPromise);

            // postPromises.push(fetch(postDetailURL));/
            //                 fetch(postDetailURL)
            //                     .then(res => res.json())
            //                     .then(res => {
            //                         const singlePost = res;
            //                         console.log(singlePost);
            //                         topPostsLocal.push(singlePost);
            // //                        const newPosts = posts;
            //                         // newPosts.push(singlePost);
            //                         // setPosts(newPosts);

            //                         if(topNumbers.length - 1  === index) {
            //                             console.log('disabling loading at index', index);
            //                             // setLoading(false);
            //                         }
            //                     })
            //                     .catch(err => {
            //                         console.log('errrr', err);
            //                         // setLoading(false);
            //                         if(topNumbers.length - 1  === index) {
            //                             console.log('disabling loading at index', index);
            //                             // setLoading(false);
            //                         }
            //                     });
            //                     index++;
            // };
            // );

            // Promise.all(postPromises)
            // .then()

            // console.log(postPromises.length + ' ' + postPromises);

            // Promise.all(postPromises)
            //     .then(multiProms => {
            //         const toootal = [];
            //         multiProms.map(singleProm => {
            //             console.log('Single ', singleProm);
            //             // const post = await singleProm.json();
            //             // toootal.push(post);
            //             singleProm
            //             .then(res => toootal.push(res.json()));
            //             // console.log(await singleProm.json());
            //         });
            //         console.log('totoal',toootal.length);
            //     })
            //     .catch(err => console.log(err))

            // console.log(topPostsLocal);

            // if(topPostsLocal.length > 0) {
            //     setPosts(topPostsLocal);
            // }

            // setLoading(false);
        } else {
            // setPosts([]);
            console.log('Show nothing');

            const postsURL = `https://jsonplaceholder.typicode.com/posts/`;

            fetch(postsURL)
                .then(res => res.json())
                .then(res => {
                    const posts = res;
                    // setTimeout(() => {
                    setPosts(posts);
                    setLoading(false);
                    // }, 5000);
                    // setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                });
        }

    }, [loc.pathname, searchTerm]);

    const onClickEvent = (post) => {
        {
            console.log('Clicked');
            // console.log({ post });
            console.log(post.id);
            navigate('/' + post.id);

        }
        // <div>
        //     <UserDetail id={4} />
        // </div>
    }


    const searchCHange = (event) => {
        // console.log('event', event.target.value);
        const searchTERM = event.target.value;
        setSearchTerm(searchTERM);
        // const postsURL = `https://jsonplaceholder.typicode.com/posts?userId=${event.target.value}`;

        // fetch(postsURL)
        //     .then(res => res.json())
        //     .then(res => {
        //         const posts = res;
        //         setPosts(posts);
        //         setLoading(false);
        //     })
        //     .catch(err => {
        //         setLoading(false);
        //     });
    } 

    return (
        <>
        {loc.pathname.match('search') && (
            <>
            <Input onChange={searchCHange}/>
            <Button>Search</Button>
            </>
        )}
    
        <SimpleGrid columns={3} spacing={4}>
            {loading && (
                <Spinner animation="circle" />
            )}
            {!loading && posts && posts.map((post) => {
                return (
                    <div key={post.id} onClick={() => onClickEvent(post)}>
                        <UserDetail id={post.id} post={post} />
                    </div>
                );
                // <div id={post.id}>
                // <GridItem key={post.id} id={post.id} onClick={() => onClickEvent(post)} w='100%'>
                {/* <UserDetail post={post} /> */ }
                {/* <Link to={post.id}  > */ }
                {/* </Link> */ }
                {/* <Spinner animation="circle" /> */ }
                // </GridItem>
                // </div>
                // <BrowserRouter>
            })}
        </SimpleGrid>
        </>
    );

}


/*


12

333
333
333

<div class="row">
    <div *ngFor="let data of datas">
        <div class="col-4">
            <p>Hello</p>
        </div> 
    <div>
</div>

*/