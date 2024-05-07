import React, { useEffect, useState } from "react";
import bgDetail from "./Image/bgBlogDetail.png";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { MdMarkEmailRead } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { submitEmail } from "../../services/user";
import { Oval } from "react-loader-spinner";
import untitled from "./Image/qlora(p2)/Untitled.png";
import untitled1 from "./Image/qlora(p2)/Untitled 1.png";
import untitled2 from "./Image/qlora(p2)/Untitled 2.png";
import untitled3 from "./Image/qlora(p2)/Untitled 3(1).png";
import untitled4 from "./Image/qlora(p2)/Untitled 4.png";
import untitled5 from "./Image/qlora(p2)/Untitled 5.png";
import untitled6 from "./Image/qlora(p2)/Untitled 6.png";
import untitled7 from "./Image/qlora(p2)/Untitled 7.png";
import untitled8 from "./Image/qlora(p2)/Untitled 8.png";
import untitled9 from "./Image/qlora(p2)/Untitled 9.png";
import untitled10 from "./Image/qlora(p2)/Untitled 10.png";
import untitled11 from "./Image/qlora(p2)/Untitled 11.png";
import PEFT from "./Image/qlora(p2)/PEFT.png";
import figure1 from "./Image/qlora(P1)/LLM.png";
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

function BlogDetail_v1() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmitEmail = async () => {
    setLoading(true);
    await submitEmail(email, "New Blog","")
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
          setLoading(false);
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
              <h2 style={{ fontWeight: "bold" }}>
                2 Parameter-efficient Fine-tuning (PEFT) techniques for LLM:
                LoRA and QLoRA (Part 2)
              </h2>
              <p>10/01/2024</p>
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
            <div
              style={{
                paddingBottom: "5%",
                width: "77%",
              }}
            >
              <h3 style={{ fontWeight: "bold" }}>QLoRA (Quantized LoRA)</h3>
              <p>
                As you have LoRA, you can train your model faster, but there are
                some models so large that you can not even load it if you don’t
                have extended resource(e.g. Llama), Don’t worry, QLoRA can help
                you lighten the model by quantization technique so that you can
                try more LLM.
              </p>
              <div style={{ marginLeft: "3%" }}>
                <h4 style={{ fontWeight: "bold" }}>Quantization</h4>
                <p style={{ paddingLeft: "2%" }}>
                  In the field of deep learning, quantization is a technique to
                  reduce the computational and memory costs of running inference
                  by representing the weights and activations with low-precision
                  data types like 8-bit integer ( int8 ) instead of the usual
                  32-bit floating point ( float32 ). This not only reduces the
                  memory storage and energy consumption but also allows the
                  models to run on embedded devices, which sometimes only
                  support integer data types.
                </p>
                <h4 style={{ fontWeight: "bold" }}>4-bit NormalFloat (NF4)</h4>
                <ul>
                  <li style={{ listStyleType: "disc" }}>
                    QLoRA proposes 4-bit NormalFloat (NF4) Quantization. The
                    NormalFloat data type builds on Quantile Quantization, which
                    ensures that each quantization bin has an equal number of
                    values, while the normal Quantization doesn't care about the
                    distribution of values. Because this approach will be
                    influenced by outliers, QLoRA splits one tensor into chunks
                    and quantizes each chunk of that tensor individually.
                  </li>
                  <li style={{ listStyleType: "disc" }}>
                    Quantile quantization has a significant limitation: the
                    process of quantile estimation is costly. Furthermore, fast
                    quantile approximation algorithms are not effective for
                    outliers. However, it has been discovered that the expensive
                    quantile estimates and approximation errors can be
                    circumvented when input tensors originate from a
                    distribution that is fixed up to a quantization constant.
                  </li>
                  <li style={{ listStyleType: "disc" }}>
                    This implies that we only need to determine the quantiles
                    once and apply them to all tensor weights.
                  </li>
                  <li style={{ listStyleType: "disc" }}>
                    To quantize tensor weight into NF4, we fisrt scale tensor
                    weight to range [-1,1], and then we use the below formula to
                    estimate 2^k values qi of the data type:
                  </li>
                </ul>
                <img
                  src={untitled}
                  width="80%"
                  style={{ padding: "3% 10%" }}
                  alt=""
                ></img>
                <p>
                  where Qx(.) is the quantile function of the standard normal
                  distribution N(0,1). Why N(0,1)? Because weights in neural
                  network usually have a zero-centered normal distribution with
                  standard deviation σ, so QLoRA transform weights into a fixed
                  distribution by scaling σ for 2^k +1 quantiles so the that the
                  distribution fits exactly to the range of the data type.
                </p>
                <ul>
                  <li>
                    But that's not everything, as symmetric k-bit quantization
                    doesn't have an exact representation of zero, which is
                    important to quantize padding and other zerovalued elements
                    with no error. So QLoRA decided that the target dtype will
                    be asymmetric. Now the quantiles qi will be divided into 2
                    parts: 2^(k-1) for the negative part with 0 and 2^(k-1)+1
                    for the positive part with 0. Then they unify these sets of
                    qi and remove one 0 as it occurs in both sets.
                  </li>
                  <li>
                    Overall, NF4 use 4 bits to express the data, place in range
                    [-1,1], asymmetric, able to represent 0 and adapt with N(0,
                    1) distribution tensor.
                  </li>
                </ul>
                <h4 style={{ fontWeight: "bold" }}>Double Quantization</h4>
                <p>
                  After chunk quantize, each chunk will have its quantization
                  constant so there will be more memory use to store them. So,
                  QLoRA decide to quantize those constant, although this process
                  will create constant of quantization constant, but they use
                  block size 256 this time so the amount of constant have to
                  store will be less.
                </p>
                <h4 style={{ fontWeight: "bold" }}>Paged Optimizers</h4>
                <p>
                  The third thing about QLora is using paged optimizer, which
                  use CPU to store memory when GPU is out of memory when
                  training and take back when the momory 2 Parameter-efficient
                  Fine-tuning (PEFT) techniques for LLM: LoRA and QLoRA (Part 2)
                  3 is needed in the optimizer update step. This will help you
                  avoid out-of-memory problem.
                </p>
                <h4 style={{ fontWeight: "bold" }}>QLoRA</h4>
                <ul>
                  <li style={{ listStyleType: "disc" }}>
                    Using all the components describe above, let’s see how QLoRA
                    compute output for a linear layer with LoRA adapter:
                  </li>
                </ul>
                <img
                  src={untitled1}
                  width="90%"
                  style={{ padding: "3% 10%" }}
                  alt=""
                ></img>
                <p>where doubleDequant(.) is defined as:</p>
                <img
                  src={untitled2}
                  width="90%"
                  style={{ padding: "3% 10%" }}
                  alt=""
                ></img>
                <p>
                  W here is the frozen weights and be turned to NF4, c2 is FP8
                  and c1 is its quantization constant. They use a blocksize 64
                  for W for higher quantization precision and a block size of
                  256 for c2 to conserve memory. The L1 and L2 is the same as
                  matrix B and A in LoRA. While computing output, the pretrained
                  part will be dequantized from NF4 to BF16, add with the part
                  of LoRA in BF16, and then transform back to NF4.
                </p>
                <ul>
                  <li style={{ listStyleType: "disc" }}>
                    As you can see, QLoRA help us load large model to train, not
                    make the training process faster. And if you wonder why we
                    need to dequantize W to BF16, that is GPU can’t compute data
                    type in 4-bit.
                  </li>
                </ul>
                <h3 style={{ fontWeight: "bold" }}>Demo</h3>
                <ul>
                  <li style={{ listStyleType: "disc" }}>
                    I’ll use model GPT 2 and try to train it on task casual
                    language model
                  </li>
                </ul>
                <img
                  src={untitled3}
                  width="95%"
                  style={{ padding: "3% 10%" }}
                  alt=""
                ></img>
                <ul>
                  <li style={{ listStyleType: "disc" }}>
                    If you want to use QLoRA, add this part, it will use
                    quantization technique
                  </li>
                </ul>
                <img
                  src={untitled4}
                  width="95%"
                  style={{ padding: "3% 10%" }}
                  alt=""
                ></img>
                <ul>
                  <li style={{ listStyleType: "disc" }}>
                    Then we have to apply some preprocessing to the model to
                    prepare it for training. For that use the{" "}
                    <span style={{ color: "#f5a816", background: "#f1e7e7" }}>
                      prepare_model_for_kbit_training
                    </span>{" "}
                    method from PEFT.
                  </li>
                </ul>
                <img
                  src={untitled5}
                  width="95%"
                  style={{ padding: "3% 10%" }}
                  alt=""
                ></img>
                <ul>
                  <li style={{ listStyleType: "disc" }}>
                    Let’s create a print parameters function, add LoRA to the
                    model and see how many trainable parameters if we use it.
                  </li>
                </ul>
                <img
                  src={untitled6}
                  width="95%"
                  style={{ padding: "3% 10%" }}
                  alt=""
                ></img>
                <img
                  src={untitled7}
                  width="95%"
                  style={{ padding: "3% 10%" }}
                  alt=""
                ></img>
                <ul>
                  <li style={{ listStyleType: "disc" }}>
                    Now I’ll create a simple trainer, at this point I’m using
                    QLoRA.
                  </li>
                </ul>
                <img
                  src={untitled8}
                  width="95%"
                  style={{ padding: "3% 10%" }}
                  alt=""
                ></img>
                <ul>
                  <li style={{ listStyleType: "disc" }}>
                    I didn’t define the loss so the default may be the cross
                    entropy loss, but the objective here is to see the time it
                    took to train, this is really fast.
                  </li>
                </ul>
                <img
                  src={untitled9}
                  width="95%"
                  style={{ padding: "3% 10%" }}
                  alt=""
                ></img>
                <ul>
                  <li style={{ listStyleType: "disc" }}>
                    I’ll see a perplexity score, try to prompt and end my demo
                    here. I think with task casual LM, simple trainer and a
                    small dataset this output is quite fine.
                  </li>
                </ul>
                <img
                  src={untitled10}
                  width="95%"
                  style={{ padding: "3% 10%" }}
                  alt=""
                ></img>
                <ul>
                  <li style={{ listStyleType: "disc" }}>
                    I also test without LoRA and QLoRA, the loss and the
                    perplexity is quite similar but it trains longer:
                  </li>
                </ul>
                <img
                  src={untitled11}
                  width="95%"
                  style={{ padding: "3% 10%" }}
                  alt=""
                ></img>
              </div>
              <h3 style={{ fontWeight: "bold" }}>Conclusion</h3>
              <p>
                LoRA and QLoRA really help us fine-tune LLM more easier and
                effectively, you may want to see their papers for more insight.
                This is the end of my blog, hope you enjoyed reading it and can
                try fine-tune some model yourself.
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
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  style={{ width: "100%" }}
                  placeholder="Enter your email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                PEFT
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
export default BlogDetail_v1;
