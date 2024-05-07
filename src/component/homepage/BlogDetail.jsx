import React, { useState } from "react";
import bgDetail from "./Image/bgBlogDetail.png";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { MdMarkEmailRead } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { submitEmail } from "../../services/user";
import { Oval } from "react-loader-spinner";
import PEFT from "./Image/qlora(p2)/PEFT.png"
import figure1 from "./Image/qlora(P1)/figure1.png";
import figure2 from "./Image/qlora(P1)/figure2.png";
import figure3 from "./Image/qlora(P1)/figure3.png";
import untitled3 from "./Image/qlora(P1)/Untitled 3.png";
import untitled4 from "./Image/qlora(P1)/Untitled 4.png";
import method from "./Image/qlora(P1)/method.png";
import LLM from "./Image/qlora(P1)/LLM.png"
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

function BlogDetail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmitEmail = async () => {
    setLoading(true);
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
                LoRA and QLoRA (Part 1)
              </h2>
              {/* <div className="d-flex">
                <BiUserCircle size={40} />
                <p>
                  Laxmi Rayapudi, VP, Product Management, Qualcomm Technologies,
                  Inc.
                </p>
              </div> */}
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
            <div style={{ paddingBottom: "5%", width: "77%" }}>
              <h3 style={{ fontWeight: "bold" }}>
                Why we need to fine-tune for LLM?
              </h3>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  A Large Language Model (LLM) is an AI algorithm that uses
                  neural networks to understand and generate human language. It
                  offers several advantages such as advanced natural language
                  processing capabilities, improved generative abilities.
                </li>
                <li style={{ listStyleType: "disc" }}>
                  One problem with LLMs is that they are pre-trained on tasks
                  such as mask language modeling, casual language modeling, and
                  next sentence prediction… However, user's requirements are
                  often quite different, such as summarization, translation, and
                  question-answering. Therefore, we need to fine-tune LLMs for a
                  specific task.
                </li>
              </ul>
              <img
                src={figure1}
                width="95%"
                style={{ padding: "3% 10%" }}
                alt=""
              ></img>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  Fine-tune help bridges the gap between the next-word
                  prediction objective of LLM and the user's demands. It is more
                  controllable and predictable, constraining the model's outputs
                  to align with the desired response characteristics or domain
                  knowledge.
                </li>
                <li style={{ listStyleType: "disc" }}>
                  If you are familiar with fine-tuning, you probably know some
                  common methods such as adjusting all or some of the weights of
                  a pre-trained model, or adding or modifying some layers to
                  adapt to a new task. For example, in computer vision, you can
                  change the output layer to recognize different objects. But
                  what if I told you there is a more efficient and faster way to
                  fine-tune your model, without compromising its performance? In
                  this blog, I will introduce you to LoRA and QLoRA, two novel
                  techniques that do just that.
                </li>
              </ul>
              <img
                src={figure2}
                width="95%"
                style={{ padding: "3% 10%" }}
                alt=""
              ></img>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  To test its performance, BERT Transformer model was
                  pre-trained on 26 diverse text classification tasks. Adapters
                  attain near state-of-the-art performance, whilst adding only a
                  few parameters per task. On GLUE, attain within 0.4% of the
                  performance of full fine-tuning, adding only 3.6% parameters
                  per task. By contrast, fine-tuning trains 100% of the
                  parameters per task (Houlsby et al., 2019).
                </li>
                <li style={{ listStyleType: "disc" }}>
                  However, adapter layers, being external modules added
                  sequentially to a pretrained model, often encounter inference
                  latency issues, which do not take advantage of GPU
                  parallelism. More crucially, these methods frequently fall
                  short of the fine-tuning baselines, creating a balance between
                  efficiency and model quality (Hu et al., 2021)
                </li>
                <li style={{ listStyleType: "disc" }}>
                  It’s also worth noting that the parameters in adapter layers
                  share the same dimension with the model’s parameters.
                  Therefore, in full fine-tuning for LLMs (like GPT-3, which has
                  approximately 175 billion parameters), the storage and Figure
                  3: Adapter layer in a transformer layer 2 Parameter-efficient
                  Fine-tuning (PEFT) techniques for LLM: LoRA and QLoRA (Part 1)
                  4 deployment of multiple independent instances of fine-tuned
                  models can pose significant challenges, if it’s even possible.
                </li>
              </ul>
              <h3 style={{ fontWeight: "bold" }}>
                Parameter-efficient Fine-tuning (PEFT) with Adapters
              </h3>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  Before coming to LoRA, let’s take a look for adapters.
                  Adapters are{" "}
                  <strong>
                    {" "}
                    new modules added between layers of a pre-trained network.{" "}
                  </strong>
                  They have been positioned as a parameter-efficient fine-tuning
                  (PEFT) approach, whereby a minimal number of parameters are
                  added to the model and fine-tuned. In Adapter based learning,
                  only the new parameters are trained while the original LLM is
                  frozen, hence we learn a very small proportion of parameters
                  of the original LLM.
                </li>
              </ul>
              <img
                src={figure3}
                width="95%"
                style={{ padding: "3% 10%" }}
                alt=""
              ></img>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  To test its performance, BERT Transformer model was
                  pre-trained on 26 diverse text classification tasks. Adapters
                  attain near state-of-the-art performance, whilst adding only a
                  few parameters per task. On GLUE, attain within 0.4% of the
                  performance of full fine-tuning, adding only 3.6% parameters
                  per task. By contrast, fine-tuning trains 100% of the
                  parameters per task (Houlsby et al., 2019).
                </li>
                <li style={{ listStyleType: "disc" }}>
                  However, adapter layers, being external modules added
                  sequentially to a pretrained model, often encounter inference
                  latency issues, which do not take advantage of GPU
                  parallelism. More crucially, these methods frequently fall
                  short of the fine-tuning baselines, creating a balance between
                  efficiency and model quality (Hu et al., 2021).
                </li>
                <li style={{ listStyleType: "disc" }}>
                  It’s also worth noting that the parameters in adapter layers
                  share the same dimension with the model’s parameters.
                  Therefore, in full fine-tuning for LLMs (like GPT-3, which has
                  approximately 175 billion parameters), the storage and Figure
                  3: Adapter layer in a transformer layer 2 Parameter-efficient
                  Fine-tuning (PEFT) techniques for LLM: LoRA and QLoRA (Part 1)
                  4 deployment of multiple independent instances of fine-tuned
                  models can pose significant challenges, if it’s even possible.
                </li>
              </ul>
              <h3 style={{ fontWeight: "bold" }}>LoRA</h3>
              <p style={{ fontWeight: "bold" }}>Objective</p>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  In usual autoregressive language modeling, the objective is to
                  find Φ to maximize the sum of the log probabilities, which is
                  equivalent to maximizing the product of the probabilities.
                </li>
              </ul>
              <img
                src={untitled3}
                width="50%"
                style={{ padding: "3% 10%" }}
                alt=""
              ></img>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  Let's first look at the above formula.{" "}
                  <strong>{`PΦ(yt|x, y<t)`}</strong> : This is the conditional
                  probability of the t-th element of the sequence 'y' given the
                  input 'x' and the previous elements of 'y' {`(y<t)`} . The
                  probability is parameterized by Φ. We then take the logarithm
                  of this probability and sum them up over all elements in the
                  sequence 'y'.
                </li>
                <li style={{ listStyleType: "disc" }}>
                  So in full fine-tuning using adapter, the model will freeze
                  the pre-trained weight Φo, add new weight ∆Φ, and update it to
                  maximize the conditional language modeling objective.
                </li>
                <li style={{ listStyleType: "disc" }}>
                  As I stated earlier, the dimension of ∆Φ is equal to Φ. If the
                  pre-trained model is large (such as GPT-3 with |Φo| ≈ 175
                  Billion), storing and deploying many independent instances of
                  fine-tuned models can be challenging. So, the Lora approach is
                  to transform ∆Φ into a much smaller-sized set of parameters Θ
                  with |Θ|
                  {`<<`} |Φo|. The task of finding ∆Φ in the old adapter
                  approach now turns to optimizing over Θ:
                </li>
              </ul>
              <img
                src={untitled4}
                width="50%"
                style={{ padding: "3% 10%" }}
                alt=""
              ></img>
              <p style={{ fontWeight: "bold" }}>Method</p>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  How it is possible? Inspired by a research: “When adapting to
                  a specific task, Aghajanyan et al. (2020) shows that the
                  pre-trained language models have a low “instrisic dimension”
                  and can still learn efficiently despite a random projection to
                  a smaller subspace.” LoRA’s creator make a hypothesis that the
                  weight being updated during adaption also have a low
                  “intrinsic rank”.
                </li>
                <li style={{ listStyleType: "disc" }}>
                  So they decompose ∆W (∆Φ) to BA (Θ) (the dimension of ∆W is d
                  x k, B is d x r, A is r x k, and the rank r {`<<`} min(d, k)).
                  A is initialized with random Gaussian and zero for B, so ∆W =
                  BA is zero at the beginning of training. And the training
                  process will be optimized by update matrix A and B. Now the
                  output of the layer h will be: h= Wox + ∆W x = Wox + BAx.
                </li>
              </ul>
              <img
                src={method}
                width="70%"
                alt=""
                style={{ padding: "3% 10%" }}
              ></img>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  So, how can this approach help the computation process become
                  lighter? For example, the dimension of ∆W is 100x200=20,000, B
                  is 100x4, and A is 4x200. So, 2 Parameter-efficient
                  Fine-tuning (PEFT) techniques for LLM: LoRA and QLoRA (Part 1)
                  6 the parameter to train now is 1,200, approximately 16.67
                  times smaller! This helps the training progress faster and use
                  less storage.
                </li>
                <li style={{ listStyleType: "disc" }}>
                  Another good feature of LoRA is that it doesn’t have inference
                  latency compared to a fine-tuned model by normal adapter
                  approach. Because of its re-parameterization feature, which
                  is:
                </li>
                <li style={{ listStyleType: "circle", marginLeft: "3%" }}>
                  Before Re-parameterize: h= Wox + BAx
                </li>
                <li style={{ listStyleType: "circle", marginLeft: "3%" }}>
                  After Re-parameterize: h = (Wo + BA)x
                </li>
                <li style={{ listStyleType: "disc" }}>
                  With that approach, you can also subtract Wo by BA to recover
                  W0 and adding a different B’A’ for another downstream task,
                  quick and memory efficient!
                </li>
                <li style={{ listStyleType: "disc" }}>
                  Therefore, you can see that LoRA can overcome adapter-base
                  method and even do better, its result is also very impressive:
                  comparable or superior to full finetuning on GLUE benchmark
                  using RoBERTa, you can see more in LoRA’s official github or
                  its paper
                </li>
              </ul>
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
              image={LLM}
              title={`2 Parameter-efficient Fine-tuning
              (PEFT) techniques for LLM:
              LoRA and QLoRA (Part 1)`}
              text={
                "A Large Language Model (LLM) is an AI algorithm that uses neural networks to understand and generate human language."
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
export default BlogDetail;
