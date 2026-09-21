const mobileBtn = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

function gotohome() {
 
  window.location.href = "https://oroglee.com";
}

function booknowaction() {
  localStorage.removeItem("selectedCity");
  localStorage.removeItem("selectedLocation");
  window.location.href = "https://oroglee.com/clinics";
}
// Smooth scroll for anchor links with data-target attribute
document.querySelectorAll(".toc-link").forEach((link) => {

  link.addEventListener("click", () => {

    const targetId = link.dataset.target;

    const target = document.getElementById(targetId);
    // console.log("Clicked TOC link for section ID:", targetId, "Found target element:", target);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  });

});

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Scroll-triggered fade-in sections ── */
  const fadeEls = document.querySelectorAll('.fade-in-section');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        console.log('Element visible:', entry.target);
        fadeObserver.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.08 });

  fadeEls.forEach(el => fadeObserver.observe(el));


  /* ── 2. Active TOC link on scroll ── */

// console.log("Sections found:", sections, "TOC links found:", tocLinks);
const sections = document.querySelectorAll("section[id]");
const tocLinks = document.querySelectorAll("#toc-nav .toc-link");

window.addEventListener("scroll", () => {

  let currentSection = "";

  sections.forEach((section) => {

    const sectionTop = section.offsetTop -150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }

  });

  tocLinks.forEach((link) => {

    const isActive =
      link.dataset.target === currentSection;

    link.classList.toggle("active", isActive);

  });

});


  /* ── 3. FAQ accordion ── */
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').classList.remove('open');
      });

      // Open clicked (toggle)
      if (!isOpen) {
        item.classList.add('open');
        answer.classList.add('open');
      }
    });
  });




  /* ── 4. Copy link share button ── */
  const copyBtn = document.getElementById('copy-link');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          const original = copyBtn.textContent;
          copyBtn.textContent = '✓';
          copyBtn.style.background = '#6B5CE7';
          copyBtn.style.color = 'white';

          // throw new Error("Testing fallback"); 
          // setTimeout(() => {
          //   copyBtn.textContent = original;
          //   copyBtn.style.background = '';
          //   copyBtn.style.color = '';
          // }, 1800);
          // const ta = document.createElement('textarea');
          
          
          // document.body.appendChild(ta);
          // ta.select();
         
          // document.body.removeChild(ta);
        })
        .catch(() => {
          // Fallback for older browsers
          const x = window.location.href;
          console.log("check the link",x)
           document.execCommand(x);
        
        });
    });
  }


  /* ── 5. Back-to-top button ── */
  const backToTop = document.createElement('button');
  backToTop.id = 'back-to-top';
  backToTop.title = 'Back to top';
  backToTop.innerHTML = '↑';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, );

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ── 8. Share buttons (Facebook / Twitter / WhatsApp) ── */
const pageUrl = window.location.href;
const encodedUrl = encodeURIComponent(pageUrl);
const pageTitle = encodeURIComponent(document.title);

const shareBtns = document.querySelectorAll('.share-btn');

shareBtns.forEach(btn => {

  btn.addEventListener('click', async () => {

    const platform = btn.dataset.platform;

    let url = '';

    if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    } 
    else if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${pageTitle}`;
    } 
    else if (platform === 'whatsapp') {
      url = `https://wa.me/?text=${pageTitle}%20${encodedUrl}`;
    } 
    else if (platform === 'copy') {

  try {
    // navigator is a built JS obj, it contains info aout the browser , device, permissions etc
    await navigator.clipboard.writeText(pageUrl);

    const copyBtn = btn;

    copyBtn.innerHTML = `
      <span class="text-[10px] font-medium">
        Copied
      </span>
    `;

    setTimeout(() => {
      copyBtn.innerHTML = `
        <i class="fa-solid fa-link"></i>
      `;
    }, 1500);

  } 
  catch (err) {
    console.error('Copy failed', err);
  }

  return;
}

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer,width=600,height=450');
    }

  });

});

});



