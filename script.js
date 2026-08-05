/**
 * SLN Transportation LLC - Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    const closeMobileMenu = () => {
      navLinks.classList.remove('mobile-open');
      mobileToggle.innerHTML = '&#9776;';
      mobileToggle.setAttribute('aria-expanded', 'false');
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('mobile-open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;'; // X or Hamburger
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('mobile-open')) {
        const header = document.querySelector('.site-header');
        if (header && !header.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });
  }

  // 3. Pre-select position on apply.html based on URL Query String (?position=driver or ?position=monitor)
  const urlParams = new URLSearchParams(window.location.search);
  const positionParam = urlParams.get('position');

  if (positionParam) {
    const targetRadio = document.querySelector(`input[name="position"][value="${positionParam.toLowerCase()}"]`);
    if (targetRadio) {
      targetRadio.checked = true;
      updateRadioCardStyles();
    }
  }

  // Handle Radio Card styling change on apply.html
  const positionRadios = document.querySelectorAll('input[name="position"]');
  if (positionRadios.length > 0) {
    positionRadios.forEach(radio => {
      radio.addEventListener('change', updateRadioCardStyles);
    });
  }

  function updateRadioCardStyles() {
    document.querySelectorAll('.radio-card').forEach(card => {
      const input = card.querySelector('input[type="radio"]');
      if (input && input.checked) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
  }

  // Initial card styling update
  updateRadioCardStyles();

  // 4. Contact Form Handler (on index.html)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name')?.value || 'Valued Customer';
      const email = document.getElementById('contact-email')?.value || '';
      const subject = document.getElementById('contact-subject')?.value || 'Inquiry';

      showModal({
        title: 'Message Sent Successfully!',
        message: `Thank you, ${name}. We have received your message regarding "${subject}". Our team at SLN Transportation LLC will reach out to you at ${email || 'your contact details'} shortly.`,
        actionText: 'Close',
        badge: 'Contact Inquiry Received'
      });

      contactForm.reset();
    });
  }

  // 5. Job Application Form Handler (on apply.html)
  const applyForm = document.getElementById('apply-form');
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('applicant-name')?.value || 'Applicant';
      const email = document.getElementById('applicant-email')?.value || '';
      const phone = document.getElementById('applicant-phone')?.value || '';
      const selectedPosition = document.querySelector('input[name="position"]:checked')?.value || 'driver';
      
      const posTitle = selectedPosition === 'monitor' ? 'School Van Monitor' : 'School Van Driver';
      const appId = 'SLN-' + Math.floor(100000 + Math.random() * 900000);

      const modalHtml = `
        <div style="text-align: center;">
          <div style="background-color: #dcfce7; color: #16a34a; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; font-size: 2rem;">✓</div>
          <h3 style="font-size: 1.5rem; color: #0f172a; margin-bottom: 0.5rem; font-family: 'Outfit', sans-serif;">Application Submitted!</h3>
          <p style="font-weight: 700; color: #ea580c; font-size: 0.95rem; margin-bottom: 1rem;">Application ID: ${appId}</p>
          <p style="color: #475569; font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">
            Thank you, <strong>${fullName}</strong>! Your application for the position of <strong>${posTitle}</strong> has been received by SLN Transportation LLC hiring team.
          </p>
          <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.85rem; color: #334155;">
            We will review your credentials and contact you at <strong>${phone || email}</strong> within 24 hours.
          </div>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <a href="https://wa.me/17733492773?text=Hello%20SLN%20Transportation%2C%20I%20just%20submitted%20job%20application%20${appId}%20for%20${encodeURIComponent(posTitle)}.%20My%20name%20is%20${encodeURIComponent(fullName)}." target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">
              💬 Fast-Track via WhatsApp
            </a>
            <button onclick="closeModal()" class="btn btn-secondary btn-sm">Done & Return Home</button>
          </div>
        </div>
      `;

      showCustomModal(modalHtml);
      applyForm.reset();
    });
  }

  // 6. Generic Modal Helpers
  function showModal({ title, message, actionText, badge }) {
    const html = `
      <div style="text-align: center;">
        <div style="background-color: #eff6ff; color: #1e3a8a; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; font-size: 2rem;">✉️</div>
        <h3 style="font-size: 1.5rem; color: #0f172a; margin-bottom: 0.5rem; font-family: 'Outfit', sans-serif;">${title}</h3>
        ${badge ? `<span style="background-color: #fff7ed; color: #ea580c; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px; display: inline-block; margin-bottom: 1rem;">${badge}</span>` : ''}
        <p style="color: #475569; font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">${message}</p>
        <button onclick="closeModal()" class="btn btn-primary">${actionText || 'OK'}</button>
      </div>
    `;
    showCustomModal(html);
  }

  function showCustomModal(contentHtml) {
    let overlay = document.getElementById('global-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'global-modal-overlay';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = '<div class="modal-content" id="global-modal-body"></div>';
      document.body.appendChild(overlay);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeModal();
        }
      });
    }

    const body = document.getElementById('global-modal-body');
    if (body) {
      body.innerHTML = contentHtml;
    }
    overlay.classList.add('active');
  }

  window.closeModal = function() {
    const overlay = document.getElementById('global-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  };
});
