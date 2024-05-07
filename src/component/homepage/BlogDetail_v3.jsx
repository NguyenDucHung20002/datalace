import React, { useState } from "react";
import bgDetail from "./Image/bgBlogDetail.png";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import { MdMarkEmailRead } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { submitEmail } from "../../services/user";
import { Oval } from "react-loader-spinner";
import figure1 from "./Image/qlora(P1)/LLM.png"
import untitled from "./Image/qlora(p2)/PEFT.png"
import RLHF3 from './Image/RLHF/RLHF03.jpg'

function CardBlog({ image, title, text, link }) {
  const navigate = useNavigate();
  return (
    <Card
      className="cardBlog col-4"
      style={{
        color: "black",
        boxShadow: "none",
        cursor: "pointer",
        width: "20rem",
        border: "none",
      }}
      onClick={() => navigate(`${link}`)}
    >
      <Card.Img style={{ height: "200px" }} variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="blogText">{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function BlogDetail_v3() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false)
  const handleSubmitEmail = async () => {
    setLoading(true)
    await submitEmail(email, "New Blog", "")
      .then((result) => {
        if (result.status === 200) {
          toast.success("Submit email success", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setEmail("");
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    {loading ? (
        <div className="loadingWrap">
          <Oval
            visible={loading}
            color="rgba(0, 23, 141, 1)"
            secondaryColor="rgba(9, 83, 151, 1)"
            strokeWidth={5}
            strokeWidthSecondary={5}
          ></Oval>
        </div>
      ) : null}
      <div
        className="container-fluid p-0"
        style={{ marginTop: "106.4px", height: "100%", textAlign:'justify' }}
      >
        <div
          style={{
            backgroundImage: `url(${bgDetail})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            color: "black",
          }}
        >
          <div style={{ padding: "10% 8% 0 8%" }}>
            <div
              style={{
                background: "white",
                borderRadius: "100px 100px 0 0",
                padding: "4% 6% 3%",
              }}
            >
              <h1 style={{ fontWeight: "bold" }}>
                Financial Technology Trends: Grab to Grow
              </h1>
              <p>06/12/2023</p>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "2% 10% 3% 10%",
            background: "white",
            color: "black",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ paddingBottom: "5%", width: "77%" }}>
              <p
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                Along with the development of the Industrial Revolution 4.More
                and more consumers are using products and services from Fintech.
                However, along with the development opportunities, Fintech in
                Vietnam is still no less difficult, challenging.{" "}
              </p>
              <h3 style={{ color: "#67D3DF", fontWeight: "bold" }}>
                Công nghệ tài chính là gì?
              </h3>
              <p>
                Fintech is the abbreviation of Financial Technology, which is
                common to all companies that use the Internet, mobile phones,
                cloud computing and open-source software to improve banking and
                investment efficiency.
              </p>
              <p>Fintech companies are divided into two groups:</p>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  The first group is consumer-servicing companies, providing
                  digital tools to improve how individuals borrow, manage money,
                  and fund startups.
                </li>
                <li style={{ listStyleType: "disc" }}>
                  The other group is back-office companies that support
                  technology for financial institutions.
                </li>
              </ul>
              <Image
                alt=""
                src="https://iclstech.edu.vn/wp-content/uploads/2023/09/cong-nghe-tai-chinh.jpeg"
                style={{ width: "100%", padding: "0 15%" }}
              />
              <p>
                Financial Technology Fintech is now offering services in a wide
                range of areas such as banking technology, payment, financial
                management, digital currencies... with a range of products such
                as:
              </p>
              <ul>
                <li style={{ listStyleType: "disc" }}>E-wallet</li>
                <li style={{ listStyleType: "disc" }}>
                  Blockchain-based distributed ledger technology
                </li>
                <li style={{ listStyleType: "disc" }}>B2C Online Trading</li>
                <li style={{ listStyleType: "disc" }}>
                  mPOS Fintech financial technology brings a start-up wave in
                  the finance-banking industry, which was previously known to
                  require a wealth of capital when it comes to joining. This
                  also leads to a diversity of ingredients, product diversity,
                  which also makes it difficult to manage.
                </li>
              </ul>
              <p>
                However, when used well, this financial technology can bring
                specific benefits such as:
              </p>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  Change product distribution channel Making products easy to
                  get to people's hands
                </li>
                <li style={{ listStyleType: "disc" }}>
                  Consumption Easily analyze customer behavior Tuberculosis
                  Reduction
                </li>
                <li style={{ listStyleType: "disc" }}>
                  Activities that reduce entrance costs for the organization
                  Error-Risk Reduction
                </li>
                <li style={{ listStyleType: "disc" }}>
                  Cost savings, discount to, product discount
                </li>
              </ul>
              <p>
                With the development of the Industrial Revolution 4.0, more and
                more consumers are using products and services from Fintech.
                Traditional financial institutions are also developing financial
                technology products through partnerships with Fintech financial
                technology companies.
              </p>
              <h3 style={{ color: "#67D3DF", fontWeight: "bold" }}>
                How is financial technology developing in Vietnam?
              </h3>
              <p>
                To date, Vietnam has 48 Fintech companies and 48% of companies
                involved in payment operations, providing customers and
                retailers with online payment services or digital payment
                solutions (2C2P, VTPay, OnePay, VTCPays, BankPlus, Vinapays,
                VNpay, Senpay, NganLuong, ZingPays and BaoKim, 123Pays...).
              </p>
              <Image
                alt=""
                src="https://iclstech.edu.vn/wp-content/uploads/2023/09/cong-nghe-tai-chinh-1.jpeg"
                style={{ width: "100%", padding: "0 15%" }}
              />
              <p>
                A few companies operate in the area of fundraising (FundStart,
                Comicola, Betado, Firststep), money transfer (Matchmove,
                Cash2vn, Nodestr, Remittance Hub), Blockchain (Bitcoin Vietnam,
                VBTC Bitcoin, Copyrobo, Cardano Labo), personal finance
                management, POS management, data management, lending and
                information comparison (Mobivi, Money Lover, Timo, Kiu, Loanvi,
                Tima, TrustCircle, Hottab, SoftPay, ibox, BankGo, gobear...).
                However, compared to some countries in the region, the number of
                Fintech companies in Vietnam is relatively small (Indonesia has
                120 FinTech companies; Singapore has more than 300 companies).
              </p>
              <h3 style={{ color: "#67D3DF", fontWeight: "bold" }}>
                The Challenges of Vietnamese Financial Technology
              </h3>
              <Image
                alt=""
                src="https://iclstech.edu.vn/wp-content/uploads/2023/09/cong-nghe-tai-chinh-2.png"
                style={{ width: "100%", padding: "0 15%" }}
              />
              <p>
                Vietnam's financial technology faces no less challenges.
                However, with the opportunities to develop Fintech financial
                technology in Vietnam, there is still a challenge:
              </p>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  First, the legal corridor is not really full, most precisely
                  for new technologies. The time for updating, revising and
                  supplementing legislation is slow compared to the rapid pace
                  of development of technology.
                </li>
                <li style={{ listStyleType: "disc" }}>
                  Secondly, Vietnam's technological infrastructure has not met
                  the requirements of high-tech development, especially security
                  technology. Third, Fintech often have difficulties with
                  business models, governance models, and long-term development,
                  which makes it difficult for them to grow.
                </li>
                <li style={{ listStyleType: "disc" }}>
                  Fourthly, consumer awareness of Fintech products is limited,
                  sometimes creating “security vulnerabilities.” People are not
                  even aware of the security of personal information such as
                  their name, ID number, passport, address, date of birth,
                  account number... This dramatically increases the risk of
                  affecting the accounts of consumers themselves as well as
                  financial institutions.
                </li>
              </ul>
              <p>
                Learning about Fintech, the opportunities, the dynamics, and the
                concerns surrounding it in a specific way can help the companies
                choose the right direction for their future. At the same time,
                this new trend requires strong moves from the government, as
                well as from investors, to realize and develop Fintech
                extensively in the market.
              </p>
            </div>
            <div
              style={{
                position: "sticky",
                width: "23%",
                marginLeft: "5%",
                right: "10px",
                height: "fit-content",
                top: "130px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <MdMarkEmailRead size={35} />
              <h4>Get Daily Updates</h4>
              <form
                style={{ fontSize: "1.3rem" }}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  style={{ width: "100%" }}
                  placeholder="Enter your email"
                  type="text"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <button
                  style={{
                    background: "#67d3df",
                    color: "white",
                    border: "none",
                    marginTop: "3%",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    width: "100%",
                  }}
                  onClick={() => handleSubmitEmail()}
                >
                  Notify me
                </button>
              </form>
            </div>
          </div>

          <h1 style={{ fontWeight: "bold" }}>
            You Might Also be Interested In
          </h1>
          <div
            className="row"
            style={{ justifyContent: "space-around", marginTop: "3%" }}
          >
            <CardBlog
              image={figure1}
              title={`2 Parameter-efficient Fine-tuning
              (PEFT) techniques for LLM:
              LoRA and QLoRA (Part 1)
              `}
              text={
                `A Large Language Model (LLM) is an AI algorithm that uses neural networks to
                understand and generate human language`
              }
              link={"/blog-detail"}
            />
            <CardBlog
              image={
                untitled
              }
              title={`2 Parameter-efficient Fine-tuning
              (PEFT) techniques for LLM:
              LoRA and QLoRA (Part 2)
              `}
              text={
                `As you have LoRA, you can train your model faster, but there are some models so large
                that you can not even load it if you don’t have extended resource(e.g. Llama), Don’t
                worry, QLoRA can help you lighten the model by quantization technique so that you can
                try more LLM.
                `
              }
              link={"/blog-detail-v1"}
            />
            <CardBlog
              image={
                RLHF3
              }
              title={"RLHF"}
              text={`In recent years, language models have demonstrated remarkable abilities by
                generating varied and engaging text from prompts provided by humans. However,
                defining what constitutes “good” text is inherently challenging as it is both subjective
                and dependent on context.`}
              link={"/blog-detail-v2"}
            />
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
export default BlogDetail_v3;
