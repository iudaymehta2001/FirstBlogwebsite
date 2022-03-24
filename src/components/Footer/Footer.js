import { Container, Heading } from "@chakra-ui/react";

export default function Footer() {
    const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial"
      };
    return (
        // <Container >/
            <Heading style={mystyle}>
                This is the End of the page
            </Heading>
        // </Container>
    );
}