

// Function to load and parse the plaintext file
async function loadImages(category,elementId,end) {
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
      const [name, path, info, vid] = line.split('|');
      return { name: name.trim(), path: path.trim(), info: info?.trim(), vid: vid?.trim() };
    });

    // Populate the HTML
    const container = document.getElementById(elementId);
    const pages = document.getElementById(end);
    var count=0;
    let currentRow;
    let imghide;
    images.forEach(image => {
      if(image.name=="header"){
        const newBlock = document.createElement("div");  
        newBlock.className = "row";
        newBlock.innerHTML = `
        <div class="col-md-8 col-md-offset-3 col-md-pull-3 animate-box" data-animate-effect="fadeInLeft">
							
							<h2 class="colorlib-heading">${image.path}</h2>
						</div>
      `;
      container.appendChild(newBlock);
      container.insertBefore(newBlock,pages);
      count = 0;
      }
      else{
        console.log(image.vid);
        if(!image.vid){
          console.log("no link");
          imghide="display:none;";
        }
        else{
          imghide="";
        }
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
            <h3  style="position: relative;">${image.name}
            <a href="${image.vid}" target="_blank" style="position: absolute; right: 0; bottom: 0;${imghide}">
										<img src="images/play-button.png" alt="icon" style="width: 20px; height: 20px;">
						</a>
            </h3>
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
