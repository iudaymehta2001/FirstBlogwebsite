import { Container, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Header(){
    const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial"
      };
    return(
        // <Container m="10px">

        <HStack style={mystyle} spacing='100px'  >
            <Link to='/' > <b>Home</b></Link>
            <Link to='/all-posts' > <b>All Posts</b></Link>
            <Link to='/top-posts' > <b>Top Posts</b></Link>
            <Link to='/make-posts' > <b>Add New Post</b></Link>
            <Link to='/search?userId=1' > <b>Search </b></Link>
            {/* <Link to='/search?userId=2' > <b>search 2</b></Link> */}
        </HStack>
        // </Container>
    );
}