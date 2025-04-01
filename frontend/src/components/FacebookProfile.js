import React, { useEffect, useState } from "react";
import "./FacebookProfile.css";
import coverImage from "./229-2297352_2067x1183-anime-princess-mononoke-studio-ghibli-studio-ghibli.jpg";
import profileImage from "./WhatsApp Image 2024-12-03 at 23.17.12.jpeg";

export default function FacebookProfile() {
  const [post, setPost] = useState("");
  const [postList, setPostList] = useState([]);

  const carregarPosts = () => {
    fetch("http://localhost:3001/mensagens")
      .then((response) => response.json())
      .then((data) => {
        setPostList(data); // Atualiza a lista de posts
      })
      .catch((error) => {
        console.error("Erro ao carregar mensagens:", error);
      });
  };

  useEffect(() => {
    carregarPosts();
    const intervalo = setInterval(carregarPosts, 5000);
    return () => clearInterval(intervalo); // Limpa o intervalo ao desmontar o componente
  }, []);

  const handlePost = (e) => {
    setPost(e.target.value); // Atualiza o estado do texto do post
  };

  const sendPost = () => {
    if (!post.trim()) return; // Previne envio de post vazio

    console.log("Enviando post:", post); // Depuração - mostra o post que será enviado

    fetch("http://localhost:3001/mensagens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texto: post }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao enviar mensagem");
        }
        return res.json();
      })
      .then(() => {
        setPost(""); // Limpa o campo de texto após o envio
        carregarPosts(); // Atualiza a lista de posts
      })
      .catch((err) => {
        console.error("Erro ao enviar post:", err);
      });
  };

  return (
    <div className="facebook-profile">
      <div className="cover-photo">
        <img src={coverImage} alt="Cover" />
        <div className="profile-info">
          <img src={profileImage} alt="Profile" className="profile-picture" />
          <div className="profile-name">Sol Okubo</div>
        </div>
      </div>

      <div className="nav-bar">
        <div>Posts</div>
        <div>Sobre</div>
        <div>Amigos</div>
        <div>Fotos</div>
        <div>Mais</div>
      </div>

      <div className="content-section">
        <div className="left-column">
          <div className="intro-box">
            <h2>Intro</h2>
            <p>Vira-lata estopinha que mora com a Maria</p>
            <p>Mora em Londrina, PR</p>
          </div>
        </div>

        <div className="right-column">
          <div className="post-box">
            <textarea
              placeholder="What's on your mind, John?"
              onChange={handlePost}
              value={post}
            ></textarea>
            <button onClick={sendPost}>Post</button>
          </div>

          <div className="posts">
            {postList.slice().reverse().map((post, index) => (
              <div key={index} className="post">
                <p>{post.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
