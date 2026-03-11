    const categoryImages = {
      'Electronics': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=320&q=80',
      'Documents': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
      'Clothing': 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop',
      'Accessories': 'https://media.istockphoto.com/id/463216215/photo/bible-study.webp?a=1&b=1&s=612x612&w=0&k=20&c=CnJI7kZ7HOhqzZxRxtXb1ZgmHQQjAacjIDWVf3y4eGk=',
      'Other': 'https://media.istockphoto.com/id/463216215/photo/bible-study.webp?a=1&b=1&s=612x612&w=0&k=20&c=CnJI7kZ7HOhqzZxRxtXb1ZgmHQQjAacjIDWVf3y4eGk=',
    };

    let items = [
      {title:'Black Backpack',desc:'Found near CST hall 202',category:'Accessories',img:categoryImages['Accessories'],loc:'CST H202',by:'Staff'},
      {title:'White ID Card',desc:'Found at main gate',category:'Documents',img:categoryImages['Documents'],loc:'Main Gate',by:'Security'},
      {title:'Red Jacket',desc:'Found at cafe 2',category:'Clothing',img:categoryImages['Clothing'],loc:'Cafe 2',by:'Student'},
      {title:'MacBook Pro',desc:'Found in library lounge',category:'Electronics',img:categoryImages['Electronics'],loc:'Library',by:'Staff'},
      {title:'Silver Wristwatch',desc:'Found in parking lot',category:'Accessories',img:categoryImages['Accessories'],loc:'Parking Lot',by:'Security'},
      {title:'Math Notebook',desc:'Found at lecture hall H107',category:'Documents',img:categoryImages['Documents'],loc:'H107',by:'Student'},
      {title:'Blue Hoodie',desc:'Found in sports complex',category:'Clothing',img:categoryImages['Clothing'],loc:'Sports Complex',by:'Student'},
      {title:'USB Drive',desc:'Found in Peter Hall',category:'Electronics',img:categoryImages['Electronics'],loc:'Peter Hall',by:'Staff'},
      {title:'Sunglasses',desc:'Found outside cafe 1',category:'Accessories',img:categoryImages['Accessories'],loc:'Cafeteria',by:'Student'},
      {title:'Green Scarf',desc:'Found in library',category:'Clothing',img:categoryImages['Clothing'],loc:'Library',by:'Staff'},
      {title:'Passport',desc:'Found at main gate',category:'Documents',img:categoryImages['Documents'],loc:'Main Gate',by:'Security'},
      {title:'Bluetooth Headphones',desc:'Found in LT2',category:'Electronics',img:categoryImages['Electronics'],loc:'LT2',by:'Student'}
    ];

    const grid = document.getElementById('grid');
    const statItems = document.getElementById('stat-items');
    statItems.textContent = items.length;

    function render(itemsToRender){
      grid.innerHTML = '';
      itemsToRender.forEach((i,index)=>{
        const card = document.createElement('div');
        card.className='card';
        card.innerHTML = `<div class="thumb"><img src="${i.img}" alt="${i.title}" style="width:100%;height:100%;object-fit:cover"></div>
          <div class="title">${i.title}</div>
          <div class="meta">${i.category} • ${i.loc}</div>`;
        card.onclick=()=>openModal(index);
        grid.appendChild(card);
      });
    }

    render(items);

    function openModal(idx){
      document.getElementById('overlay').style.display='flex';
      const i = items[idx];
      document.getElementById('modal-title').textContent=i.title;
      document.getElementById('modal-img').src=i.img;
      document.getElementById('modal-desc').textContent=i.desc;
      document.getElementById('modal-loc').textContent=i.loc;
      document.getElementById('modal-by').textContent=i.by;
    }
    function closeModal(){document.getElementById('overlay').style.display='none'}
    function openClaim(){document.getElementById('claimOverlay').style.display='flex'}
    function closeClaim(){document.getElementById('claimOverlay').style.display='none'}

    function show(section){
      ['browse','report','search','notifications','profile'].forEach(s=>{
        document.getElementById(s).style.display=s===section?'block':'none';
      });
    }

    function filter(){
      const q = document.getElementById('q').value.toLowerCase();
      render(items.filter(i=>i.title.toLowerCase().includes(q)||i.category.toLowerCase().includes(q)||i.loc.toLowerCase().includes(q)));
    }

    function submitReport(e){
      e.preventDefault();
      const newItem={
        title:document.getElementById('title').value,
        desc:document.getElementById('desc').value,
        category:document.getElementById('cat').value,
        img:categoryImages[document.getElementById('cat').value],
        loc:'User report',
        by:'Student'
      };
      items.unshift(newItem);
      render(items);
      statItems.textContent = items.length;
      show('browse');
      document.getElementById('reportForm').reset();
      alert('Item reported successfully!');
    }
    function submitClaim(e){e.preventDefault();alert('Claim submitted! Security will review.');closeClaim();}
    function openReport(){show('report')}