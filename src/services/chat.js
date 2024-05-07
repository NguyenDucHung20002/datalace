import axios from "axios";

var api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

class ChatService {
  sendQuestion(inputValue, filename, timestamp, title, token) {
    return api.post(
      "/chatbot",
      {
        user_input: inputValue,
        filename: filename,
        timestamp: timestamp.toString(),
        title: title,
        token: token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
  }

  visualize(input, filename, timestamp, token, model) {
    return parseInt(model) !== 0
      ? api.post(
          `/vizs`,
          {
            user_input: input,
            filename: filename,
            timestamp: timestamp.toString(),
            token: token,
            model_index: parseInt(model),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the Authorization header
            },
          }
        )
      : api.post(
          `/viz`,
          {
            user_input: input,
            filename: filename,
            timestamp: timestamp.toString(),
            token: token,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the Authorization header
            },
          }
        );
  }

  edit(input, filename, timestamp_query, timestamp, title, token) {
    return api.post(
      "/edit",
      {
        user_input: input,
        filename: filename,
        timestamp_query: timestamp_query.toString(),
        timestamp: timestamp.toString(),
        title: title,
        token: token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
  }

  predict(filename, regenerate, user_input, file_edit, token) {
    return api.post(
      "/predict",
      {
        filename: filename,
        regenerate: regenerate,
        user_input: user_input,
        file_edit: file_edit,
        token: token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
  }
  highlight(filename, regenerate, token) {
    return api.post(
      "/highlight",
      {
        filename: filename,
        regenerate: regenerate,
        token: token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
  }
  clean(filename, token) {
    return api.post(
      "/clean",
      {
        filename: filename,
        token: token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
  }

  uploadFolder(folderName, token) {
    return api.post(
      "/description",
      {
        folder_name: folderName,
        token: token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
  }

  regenerate(input,filename, token, timestamp,model) {
    return api.post(
      "/regenerate",
      {
        user_input: input,
        filename: filename,
        timestamp: timestamp.toString(),
        token: token,
        model_index: parseInt(model),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
  }

  upload(file, token) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("token", token);
    return api.post("/upload-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new ChatService();
