

// Function to load and parse the plaintext file
async function loadNews() {
    const filePath = `files/News.txt`;
    try {
      // Fetch the file
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`Failed to load file: ${response.statusText}`);
      
      // Read the file content as text
      const text = await response.text();
      
      // Split lines and parse each line
      const lines = text.split('\n').filter(line => line.trim() !== '');
      const news = lines.map(line => {
        const [title, content] = line.split('|');
        return { title: title.trim(), content: content.trim() };
      });
  
      // Populate the HTML
      const container = document.getElementById("newsblock");
      news.forEach(news => {
          const newBlock = document.createElement("div");  
          newBlock.className = "colorlib-feature animate-box";
          newBlock.setAttribute("data-animate-effect", "fadeInLeft");
          newBlock.innerHTML = `
          <div class="colorlib-icon" style="background-image: url(images/NEW.png);background-size: cover;">
          </div>
          <div class="colorlib-text">
              <h3>${news.title}</h3>
              <p>${news.content}</p>
          </div>
        `;
        container.appendChild(newBlock);
        //container.insertBefore(newBlock,pages);
   
  
      });
  
      window.contentWayPoint();
      } catch (error) {
          console.error('Error loading images:', error);
          }
  }
  
  // Call the function to load images
  //loadImages();
  