import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
import Subscribe from "./SubscribeModal";
/* 1) Create the styled container */
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  // set background-color: coral; to start working on arrows, then, we can delete it
  positon: relative;
  ${mobile({ display: "none" })}
`;

/* 3) Style the Arrow component, and put in inside the Home page */
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute; //Parent should be position relative
  top: 0;
  bottom: 0;
  //We use props direction and pass it to left and right arrow below
  //Don not forget the ; at the end.
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.8;
  z-index: 2;
`;

/* 4) Create the Wrapper */

const Wrapper = styled.div`
  height: 100%;
  display: flex;

  transition: all 2s ease;
  //8.1 Transform the slider, at the beginning it is gonna be 0 vw. Above give z-index: 2; to Arrow
  transform: translateX(
    ${(props) => props.slideIndex * -195}vh
  ); // Play with -100/-200 values to fit sliders on screen
`;

/* 5) Create the slides( Slide, ImgContainer and InfoContainer) horizontal to fill the Wrapper. Add the image */
const Slide = styled.div`
  display: flex;

  width: 100vw; //Contained inside the whole container
  height: 100vh;
  align-items: center;
  //7) bg props to Slide props
  background-color: #${(props) => props.bg};
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%; //its Parent is Slider which is 100vh
`;
const Image = styled.img`
  height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const DescContainer = styled.div`
  flex-direction: column;
  justify-content: left;
  padding: 5px;
`;

/*  6) Create title styled and show them inside the Info Container. Duplicate then the Slide component and Wrapper display:flex;*/
const Title = styled.h1`
  font-size: 60px;
  font-family: Poppins;
  margin-top: 12px;
  margin-right: 5px;

  font-weight: 200;
`;
const TitleTwo = styled.h1`
  font-size: 70px;
  font-family: Yomogi;
  color: #853b7d;
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 200;
  font-family: Poppins;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  font-family: Yomogi;
  border-radius: 15px;
`;

const Slider = () => {
  const auth = useSelector((state) => state.auth);
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [categorie, setCategorie] = useState("");
  console.log("🚀 ~ file: Slider.jsx:122 ~ Slider ~ categorie", categorie);

  /* 8) Create handleClick Function, first create data.js file and then, map over sliderItems, 
  instead of crreating every single Slide, pass slideIndex as a prop to Wrapper*/
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 4);
    } else {
      setSlideIndex(slideIndex < 4 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      {/* 2)Create 2 arrows. Import some arrow icon from mui material icon. */}
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <KeyboardArrowLeftIcon />
      </Arrow>

      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <TitleContainer>
                <Title>{item.title}</Title>
                <TitleTwo>{item.titleTwo}</TitleTwo>
              </TitleContainer>
              <DescContainer>
                {" "}
                {auth._id ? (
                  <Link to={`/products/${item.cat}`}>
                    <Button>Explorar</Button>
                  </Link>
                ) : (
                  <div>
                    <Button
                      onClick={() => {
                        setCategorie(item.cat);
                        setOpenSubscribe(true);
                      }}
                    >
                      Explorar
                      <Subscribe
                        cat={categorie}
                        open={openSubscribe}
                        close={() => setOpenSubscribe(false)}
                      />
                    </Button>
                  </div>
                )}
                <Desc>{item.desc}</Desc>
              </DescContainer>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <KeyboardArrowRightIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
