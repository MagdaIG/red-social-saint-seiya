// Función para manejar los "Me gusta"
function likePost(button) {
  const likeCountElement = button.querySelector('.like-count');
  let likeCount = parseInt(likeCountElement.textContent);

  if (button.classList.contains('liked')) {
    button.classList.remove('liked');
    likeCount--;
    button.innerHTML = `<i class="far fa-heart me-1"></i> <span class="like-count">${likeCount}</span>`;
  } else {
    button.classList.add('liked');
    likeCount++;
    button.innerHTML = `<i class="fas fa-heart me-1"></i> <span class="like-count">${likeCount}</span>`;
  }
}

// Función para mostrar/ocultar comentarios
function toggleComments(postElement) {
  const commentsSection = postElement.querySelector('.comments-section');
  commentsSection.classList.toggle('d-none');
}

// Función para agregar comentarios
function addComment(postElement) {
  const commentInput = postElement.querySelector('.comment-input');
  const commentText = commentInput.value.trim();

  if (commentText) {
    const commentsContainer = postElement.querySelector('.comments-container');
    const newComment = document.createElement('div');
    newComment.className = 'd-flex mb-2';

    // Obtener datos del perfil activo
    const currentProfile = {
      name: document.getElementById('profileName').textContent,
      img: document.getElementById('profileImage').src
    };

    newComment.innerHTML = `
      <img src="${currentProfile.img}" class="rounded-circle me-2" width="32" height="32">
      <div class="bg-light p-2 rounded flex-grow-1">
        <strong>${currentProfile.name}</strong>
        <p class="mb-0">${commentText}</p>
      </div>
    `;
    commentsContainer.appendChild(newComment);
    commentInput.value = '';

    // Actualizar contador de comentarios
    const commentCount = postElement.querySelector('.comment-count');
    if (commentCount) {
      const currentCount = parseInt(commentCount.textContent);
      commentCount.textContent = currentCount + 1;
    }
  }
}

// Variables globales para el perfil
let currentProfileIndex = 0;
const profiles = [
  {
    name: "Seiya de Pegaso",
    constellation: "Caballero de Pegaso",
    bio: "\"Mi cosmos arde más que las estrellas. Protegeré a Atena con mi vida.\"",
    img: "seiya.png",
    posts: "12",
    followers: "1.5K",
    following: "87"
  },
  {
    name: "Shaina de Ofiuco",
    constellation: "Caballera de Plata",
    bio: "\"La disciplina forja verdaderos guerreros.\"",
    img: "shaina.png",
    posts: "24",
    followers: "2.3K",
    following: "45"
  },
  {
    name: "Shiryu de Dragón",
    constellation: "Caballero de Dragón",
    bio: "\"La verdadera fuerza proviene del espíritu y la justicia.\"",
    img: "shiryu.png",
    posts: "18",
    followers: "1.8K",
    following: "62"
  },
  {
    name: "Hyoga de Cisne",
    constellation: "Caballero de Cisne",
    bio: "\"El frío de mi corazón se derrite con el calor de mis amigos.\"",
    img: "hyoga.png",
    posts: "15",
    followers: "1.6K",
    following: "58"
  },
  {
    name: "Ikki de Fénix",
    constellation: "Caballero de Fénix",
    bio: "\"Solo los fuertes sobreviven, pero lucho por proteger a los débiles.\"",
    img: "ikki.png",
    posts: "32",
    followers: "3.2K",
    following: "28"
  }
];

// Función para actualizar el perfil mostrado
function updateProfileDisplay() {
  const profile = profiles[currentProfileIndex];
  const profileImg = document.getElementById('profileImage');

  profileImg.classList.add('profile-change');

  setTimeout(() => {
    document.getElementById('profileName').textContent = profile.name;
    document.getElementById('profileConstellation').textContent = profile.constellation;
    document.getElementById('profileBio').textContent = profile.bio;
    profileImg.src = `assets/img/${profile.img}`;
    document.getElementById('profilePosts').textContent = profile.posts;
    document.getElementById('profileFollowers').textContent = profile.followers;
    document.getElementById('profileFollowing').textContent = profile.following;

    profileImg.classList.remove('profile-change');
  }, 500);
}

// Cambio de perfil al hacer clic en "Cambiar caballero"
document.addEventListener('DOMContentLoaded', function () {
  const changeProfileBtn = document.getElementById('changeProfile');

  if (changeProfileBtn) {
    changeProfileBtn.addEventListener('click', function () {
      currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
      updateProfileDisplay();
    });
  }

  // Botones de seguir
  document.querySelectorAll('.follow-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.textContent === 'Seguir') {
        this.textContent = 'Siguiendo';
        this.classList.remove('btn-outline-primary');
        this.classList.add('btn-primary');
      } else {
        this.textContent = 'Seguir';
        this.classList.remove('btn-primary');
        this.classList.add('btn-outline-primary');
      }
    });
  });

  // Publicar nueva publicación
  const postButton = document.querySelector('.btn-primary[type="button"]');
  if (postButton) {
    postButton.addEventListener('click', function() {
      const postInput = document.querySelector('.form-control[type="text"]');
      const postText = postInput.value.trim();

      if (postText) {
        const postsContainer = document.querySelector('.col-lg-6');
        const newPost = document.createElement('div');
        newPost.className = 'card mb-4 post-card';

        const currentProfile = profiles[currentProfileIndex];

        newPost.innerHTML = `
          <div class="card-body">
            <div class="d-flex mb-3">
              <img src="assets/img/${currentProfile.img}" class="rounded-circle me-3" width="50" height="50" alt="${currentProfile.name}">
              <div>
                <h6 class="mb-0">${currentProfile.name}</h6>
                <small class="text-muted">Ahora mismo</small>
              </div>
            </div>
            <p class="card-text">${postText}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-like" onclick="likePost(this)">
                <i class="far fa-heart me-1"></i> <span class="like-count">0</span>
              </button>
              <button class="btn btn-outline-secondary btn-sm toggle-comments" onclick="toggleComments(this.closest('.post-card'))">
                <i class="far fa-comment me-1"></i> <span class="comment-count">0</span>
              </button>
              <button class="btn btn-outline-secondary btn-sm">
                <i class="fas fa-share me-1"></i> Compartir
              </button>
            </div>
            <div class="comments-section d-none mt-3">
              <div class="comments-container"></div>
              <div class="d-flex mt-3 comment-input-container">
                <input type="text" class="form-control comment-input" placeholder="Escribe un comentario...">
                <button class="btn btn-primary btn-sm comment-btn" onclick="addComment(this.closest('.post-card'))">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        `;

        postsContainer.insertBefore(newPost, postsContainer.children[1]);
        postInput.value = '';
      }
    });
  }
});
