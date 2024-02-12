import Banner from "../assets/banner.png";
const Home = () => {
  return (
    <div 
      className="home"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
        color: "black",
      }}
    >
      <img
        src={Banner}
        style={{
          width: "50vw",
          margin: "0",
        }}
        alt=""
      />
      <h1>Tic-Tac-Toe By - Pulkit</h1>
    </div>
  );
};

export default Home;
