import Image from "next/image";
import error from "../../public/assets/error.png";

const NotFoundPage = () => {
  return (
    <div
      style={{
        color: "red",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        marginTop: "60px",
        fontFamily: "Poppins",
        fontSize: "1.6rem",
      }}
    >
      <Image src={error} width={250} height={200} alt="error page" />
      <p>404 || Sorry this page is unavailable.</p>
    </div>
  );
};

export default NotFoundPage;
