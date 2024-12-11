

// Function to load and parse the plaintext file
async function loadImages(category) {
  //var category = 'A2'
  const filePath = `products/${category}.txt`;
  const filePath2 = `products/${category}info.txt`;
  try {
    // Fetch the file
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load file: ${response.statusText}`);
    
    // Read the file content as text
    const text = await response.text();
    
    // Split lines and parse each line
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const images = lines.map(line => {
      const [name, path, info] = line.split('|');
      return { name: name.trim(), path: path.trim(), info: info.trim() };
    });

    // Populate the HTML
    const container = document.getElementById('products');
    const pages = document.getElementById("pagelist");
    var count=0;
    let currentRow;
    images.forEach(image => {
      if(image.name=="headerblock"){
        
          //count =0 force new row
      }
      else{
        
      
      const newBlock = document.createElement("div");
      newBlock.className = "col-md-2 col-sm-6 animate-box";
      newBlock.setAttribute("data-animate-effect", "fadeInLeft");
    
      // Populate the block's content
      newBlock.innerHTML = `
        <div class="blog-entry">
          <a href="images/${category}/${image.info}" class="blog-img" data-lightbox="image-${count}">
            <img src="images/${category}/${image.path}" class="img-responsive" alt="${image.name}">
          </a>
          <div class="desc">
            <h3>${image.name}</h3>
          </div>
        </div>
      `;

  // Get the last row
  

  // If no row exists or the last row already has 4 children, create a new row
  if (count%5==0) {
    currentRow = document.createElement("div");
    currentRow.classList.add("row");
    container.appendChild(currentRow);
    container.insertBefore(currentRow,pages);
  }
    currentRow.appendChild(newBlock);
    count++;
    }//end else


    });

    window.contentWayPoint();
    } catch (error) {
        console.error('Error loading images:', error);
        }
}

// Call the function to load images
//loadImages();
