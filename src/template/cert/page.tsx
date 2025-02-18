/* eslint-disable @next/next/no-img-element */

const titleConfig = {
  font: "Arial",
  fontSize: 50,
  fontWeight: "bold",
  color: "black",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}

const CertificatePage = () => {
  return (
    <div className="bg-muted/50 grid place-items-center">
      <div className="relative w-auto h-screen">
        <div className="absolute" style={titleConfig}>Your Name</div>
        <img src="/assets/images/template_cert.webp" alt="" className="w-auto h-screen" />
      </div>
    </div>
  );
}

export default CertificatePage;