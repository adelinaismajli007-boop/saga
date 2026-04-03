export default function Converter() {
  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Link Converter</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Paste a News Saga article link and get the Vercel share link.</p>

      <label style={{ fontSize: '14px', color: '#555', display: 'block', marginBottom: '6px' }}>WordPress article URL</label>
      <input
        type="text"
        id="wpLink"
        placeholder="https://news-saga.com/your-article"
        style={{ width: '100%', padding: '10px', fontSize: '15px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box', marginBottom: '12px' }}
      />

      <button
        onclick="convert()"
        style={{ width: '100%', padding: '12px', fontSize: '15px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        Convert →
      </button>

      <div id="result" style={{ display: 'none', marginTop: '24px', background: '#f5f5f5', borderRadius: '8px', padding: '16px' }}>
        <p style={{ fontSize: '13px', color: '#666', margin: '0 0 6px' }}>Your Vercel link</p>
        <p id="vercelLink" style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 12px', wordBreak: 'break-all' }}></p>
        <button
          onclick="copyLink()"
          id="copyBtn"
          style={{ width: '100%', padding: '10px', fontSize: '14px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}
        >
          Copy link
        </button>
      </div>

      <div id="error" style={{ display: 'none', marginTop: '12px', background: '#fff0f0', borderRadius: '8px', padding: '12px' }}>
        <p id="errorMsg" style={{ fontSize: '13px', color: 'red', margin: '0' }}></p>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        function convert() {
          const input = document.getElementById('wpLink').value.trim();
          const result = document.getElementById('result');
          const error = document.getElementById('error');
          result.style.display = 'none';
          error.style.display = 'none';

          if (!input) {
            document.getElementById('errorMsg').innerText = 'Please paste a WordPress article URL first.';
            error.style.display = 'block';
            return;
          }

          try {
            const url = new URL(input);
            const parts = url.pathname.replace(/\\/$/, '').split('/');
            const slug = parts[parts.length - 1];
            if (!slug) {
              document.getElementById('errorMsg').innerText = 'Could not detect the article slug.';
              error.style.display = 'block';
              return;
            }
            document.getElementById('vercelLink').innerText = 'https://saga-plum.vercel.app/posts/' + slug;
            result.style.display = 'block';
          } catch(e) {
            document.getElementById('errorMsg').innerText = 'Invalid URL. Please paste a full URL.';
            error.style.display = 'block';
          }
        }

        function copyLink() {
          const link = document.getElementById('vercelLink').innerText;
          navigator.clipboard.writeText(link).then(() => {
            const btn = document.getElementById('copyBtn');
            btn.innerText = 'Copied!';
            setTimeout(() => btn.innerText = 'Copy link', 2000);
          });
        }

        document.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') convert();
        });
      ` }} />
    </main>
  );
}
