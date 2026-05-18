import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer
      style="
        background: var(--ink);
        color: var(--paper);
        padding: 100px 0 60px;
        border-top: 1px solid rgba(250,246,236,.1);
      "
    >
      <div class="wrap" style="text-align: center">
        <div
          style="color:var(--accent-3);margin-bottom:24px;display:inline-flex;align-items:center;gap:14px"
        >
          <svg
            width="32"
            height="14"
            viewBox="0 0 32 14"
            fill="none"
            style="color:currentColor;opacity:.7"
          >
            <path d="M2 7 H30" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            <ellipse cx="22" cy="4.5" rx="2.4" ry="1.4" fill="currentColor" />
            <ellipse cx="22" cy="9.5" rx="2.4" ry="1.4" fill="currentColor" />
            <ellipse cx="26.5" cy="4.5" rx="2" ry="1.2" fill="currentColor" />
            <ellipse cx="26.5" cy="9.5" rx="2" ry="1.2" fill="currentColor" />
          </svg>
          <span style="font-family:var(--font-script);font-size:28px">on se voit lundi</span>
          <svg
            width="32"
            height="14"
            viewBox="0 0 32 14"
            fill="none"
            style="transform:scaleX(-1);color:currentColor;opacity:.7"
          >
            <path d="M2 7 H30" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            <ellipse cx="22" cy="4.5" rx="2.4" ry="1.4" fill="currentColor" />
            <ellipse cx="22" cy="9.5" rx="2.4" ry="1.4" fill="currentColor" />
            <ellipse cx="26.5" cy="4.5" rx="2" ry="1.2" fill="currentColor" />
            <ellipse cx="26.5" cy="9.5" rx="2" ry="1.2" fill="currentColor" />
          </svg>
        </div>

        <h2
          class="h-display"
          style="font-size:clamp(48px,7vw,96px);line-height:.95;color:var(--paper);margin:0"
        >
          Le bon, le local,<br />le pas cher.
        </h2>

        <div
          class="footer-foot"
          style="
            margin-top:56px;
            padding-top:28px;
            border-top:1px solid rgba(250,246,236,.12);
            display:flex;
            justify-content:space-between;
            flex-wrap:wrap;
            gap:16px;
            font-size:13px;
            color:rgba(250,246,236,.6);
          "
        >
          <div>© 2026 Le Trio des Champs — Collectif de producteurs picards</div>
          <div style="display:flex;gap:24px;flex-wrap:wrap">
            <a
              routerLink="/mentions-legales"
              style="border-bottom:1px solid rgba(250,246,236,.25);padding-bottom:1px"
              >Mentions légales</a
            >
            <a
              routerLink="/politique-confidentialite"
              style="border-bottom:1px solid rgba(250,246,236,.25);padding-bottom:1px"
              >Politique de confidentialité</a
            >
          </div>
          <div>Plessier-sur-Bulles · Oise · France</div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
