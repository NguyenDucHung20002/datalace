import React, { useEffect, useState } from "react";
import bgDetail from "./Image/bgBlogDetail.png";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { MdMarkEmailRead } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { submitEmail } from "../../services/user";
import figure1 from "./Image/qlora(P1)/LLM.png";
import untitled from "./Image/qlora(p2)/PEFT.png";
import RLHF0 from "./Image/RLHF/Untitled.png";
import RLHF1 from "./Image/RLHF/Untitled 1.png";
import RLHF2 from "./Image/RLHF/Untitled 2.png";
import RLHF3 from "./Image/RLHF/RLHF03.jpg";

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

function BlogDetail_v2() {
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
        style={{ marginTop: "106.4px", height: "100%" }}
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
              <h2 style={{ fontWeight: "bold" }}>RLHF</h2>
              <p>01/02/2024</p>
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
                textAlign: "justify",
              }}
            >
              <h3 style={{fontWeight: "bold" }}>
                Introduction
              </h3>
              <p
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                In recent years, language models have demonstrated remarkable
                abilities by generating varied and engaging text from prompts
                provided by humans. However, defining what constitutes “good”
                text is inherently challenging as it is both subjective and
                dependent on context. Sometime you want it creative like when
                writing blog, sometime you want it to be precise and truthful.
              </p>
              <p>
                Having a loss function to evaluate all task is kind of
                impossible. Most language models are still trained with simple
                task like next token prediction loss (e.g. cross entropy). There
                are another metrics that are better to capture human behavior,
                like BLEU, ROUGE, METEOR… Although these metrics are better
                suited than the loss function itself for measuring performance,
                they are still limited as they’re only good on some tasks. So if
                we can’t use some math metric to make the model behave like
                human, why don’t we use human. If we can use human feedback to
                evaluate generated text, maybe the model can be optimize to fit
                human’s requirements. This is the concept behind Reinforcement
                Learning from Human Feedback (RLHF); it employs reinforcement
                learning techniques to directly optimize a language model with
                human feedback.
              </p>
              <h3 style={{ fontWeight: "bold" }}>
                How it work
              </h3>
              <p>
                RLHF is quite difficult, it involves a multiple-model training
                process and different stages of deployment. There are 3 main
                stages:
              </p>
              <p>1. Pretraining a language model (LM).</p>
              <p>2. Training a reward model.</p>
              <p>3. Fine-tuning the LM with reinforcement learning.</p>

              <h3 style={{fontWeight: "bold" }}>
                Pretraining language model
              </h3>
              <p>
                At this first stage, you will train a LM normally (use available
                data, structure, optimization) from scratch if you want to, or
                maybe you want to use some popular pretrained models (GPT3,
                InstructGPT…) base on your objective. You can also RLHF 2
                fine-tune it for some specific tasks but it is not really
                necessary. In general, there are no best choice for the starting
                stage of RLHF.
              </p>
              <p>
                This model later will be used to generate text, but generate
                from the available dataset won’t meet our requirements. Thus, we
                may need data that is generated with the help from human. But
                how it could be archived? Let’s go to stage two.
              </p>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img src={RLHF0} width="70%" alt="RLHF1"></img>
                <p style={{ color: "gray" }}>
                  Figure 1. Language model training
                </p>
              </span>
              <h3 style={{fontWeight: "bold" }}>
                Training a reward model
              </h3>
              <p>
                In the research on Reinforcement Learning from Human Feedback
                (RLHF), the focus lies on generating a calibrated reward model
                (RM) based on human preferences. The goal is to create a system
                that, given a text sequence, produces a scalar reward
                representing human preference. The LMs for reward modeling can
                be fine-tuned or trained from scratch on preference data, with
                no clear best choice.
              </p>
              <p>
                The training dataset for RM is generated by sampling prompts
                from a predefined dataset and passing them through the initial
                LM to produce new text. Human Figure 1. Language model training
                RLHF 3 annotators rank the generated outputs to avoid
                uncalibrated and noisy scalar scores. Instead, rankings are used
                to compare outputs and create a more regularized dataset.
                Various ranking methods exist, with successful ones involving
                head-to-head matchups of text generated by different models,
                utilizing an Elo system to establish rankings.
              </p>
              <p>
                An interesting observation is that successful RLHF systems use
                reward language models with varying sizes relative to text
                generation, suggesting the need for similar capacity in
                understanding text for both the initial and preference models.
                The RLHF process involves having an initial LM and a preference
                model, followed by using reinforcement learning to optimize the
                original LM based on the reward model.
              </p>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img src={RLHF1} width="70%" alt="RLHF1"></img>
                <p style={{ color: "gray" }}>Figure 2. Reward model training</p>
              </span>
              <h3 style={{fontWeight: "bold" }}>
                Fine-tuning the LM with reinforcement learning.
              </h3>
              <p>
                For a long time, training a language model (LM) with
                reinforcement learning (RL) seemed impossible due to engineering
                and algorithmic challenges. Organizations have achieved success
                by fine-tuning some or all of the parameters of an initial LM
                using a policy-gradient RL algorithm, Proximal Policy
                Optimization (PPO). The freezing of certain parameters is
                necessary due to the high cost of fine-tuning large models. PPO,
                a well-established algorithm, has been adopted for its
                scalability to distributed training in the new application RLHF.
              </p>
              <p>
                In formulating the fine-tuning task as an RL problem, the{" "}
                <strong>policy</strong>
                is the LM, taking prompts and generating text. The{" "}
                <strong>action space</strong>
                comprises vocabulary tokens, and the{" "}
                <strong>observation space</strong> involves possible input token
                sequences. The <strong>reward function</strong> combines the
                preference model and a constraint on policy shift. Given a
                prompt, the fine-tuned policy generates text, which,
                concatenated with the original prompt, is passed to the
                preference model. The reward function includes a scalar
                "preferability" from the preference model and a penalty based on
                the Kullback–Leibler divergence between token probability
                distributions of RL policy and the initial model. This penalty
                ensures coherence in generated text and prevents divergence from
                the pretrained model.
              </p>
              <p>
                Some RLHF systems may include additional terms in the reward
                function, such as mixing pre-training gradients into the update
                rule. The update rule, derived from PPO, maximizes reward
                metrics in the current data batch. PPO is an on-policy
                algorithm, updating parameters only with the current
                prompt-generation pairs batch. The update rule maintains
                stability through trust region optimization and gradient
                constraints. The formulation of the reward function is likely to
                evolve as RLHF research progresses.
              </p>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img src={RLHF2} width="70%" alt="RLHF1"></img>
              </span>
              <p>
                Optionally, RLHF can continue by continuously updating the
                reward model and the policy together. After each update version,
                users can keep ranking new outputs versus the earlier versions.
                This kind of deployment need to collect this type of data only
                works for dialogue agents with access to an engaged user based.
              </p>
              <h3 style={{fontWeight: "bold" }}>
                Conclusion
              </h3>
              <p>
                So that’s how RLHF works. In this blog I just write simple about
                it. In reality, the technique is quite more complex, if you want
                to understand deeper about RLHF, you may want to learn more
                about reinforcement learning, fine-tune a LM, reward model, PPO
                and Kullback–Leibler divergence.
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
              text={`A Large Language Model (LLM) is an AI algorithm that uses neural networks to
                understand and generate human language`}
              link={"/blog-detail"}
            />
            <CardBlog
              image={untitled}
              title={`2 Parameter-efficient Fine-tuning
              (PEFT) techniques for LLM:
              LoRA and QLoRA (Part 2)
              `}
              text={`As you have LoRA, you can train your model faster, but there are some models so large
                that you can not even load it if you don’t have extended resource(e.g. Llama), Don’t
                worry, QLoRA can help you lighten the model by quantization technique so that you can
                try more LLM.
                `}
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
export default BlogDetail_v2;
