# Deploying and Publishing to pacenp.com

Your PACE Consultant website has been successfully deployed to the cloud via **InsForge**. To publish it under your custom domain **pacenp.com**, follow these steps:

---

## Step 1: Bind the Custom Domain in the InsForge Dashboard

1. Log in to your **InsForge Console** (e.g. at [https://insforge.dev](https://insforge.dev)).
2. Select your project: **Pacenp.com** (Project ID: `2ab7e830-440d-44b8-9798-3dec138d5f39`).
3. Go to the **Frontend Deployments** or **Domains** section.
4. Add your domain names:
   - `pacenp.com` (root domain)
   - `www.pacenp.com` (subdomain)
5. InsForge will generate the required DNS records for verification. Because InsForge deploys to Vercel under the hood, these are typically:
   - **For root (`@` or `pacenp.com`):** An `A` record pointing to Vercel's IP: `76.76.21.21`.
   - **For subdomain (`www`):** A `CNAME` record pointing to Vercel's host: `cname.vercel-dns.com` (or your InsForge domain `6i6quq6k.insforge.site`).

---

## Step 2: Configure DNS Settings for pacenp.com

Since `pacenp.com` is a `.np` domain, its DNS management is usually handled through a DNS manager (like Cloudflare) or your hosting provider.

### Option A: Using Cloudflare (Highly Recommended)
If you manage your DNS using Cloudflare:
1. Log in to your **Cloudflare Dashboard**.
2. Go to the DNS tab for `pacenp.com`.
3. Add the following records:
   - **Type:** `A` | **Name:** `@` (represents root) | **IPv4 address:** `76.76.21.21` | **Proxy status:** DNS Only (or Proxied after verification).
   - **Type:** `CNAME` | **Name:** `www` | **Target:** `cname.vercel-dns.com` (or `6i6quq6k.insforge.site`) | **Proxy status:** DNS Only.
4. Click **Save**.

### Option B: Using cPanel / Other DNS Host
If your DNS is managed through standard shared hosting/cPanel:
1. Log in to your cPanel control panel.
2. Search for **Zone Editor** (or DNS Zone Editor).
3. Click **Manage** for `pacenp.com`.
4. Add the records:
   - **Type:** `A` | **Name:** `pacenp.com.` | **Record:** `76.76.21.21`
   - **Type:** `CNAME` | **Name:** `www.pacenp.com.` | **Record:** `cname.vercel-dns.com` (or `6i6quq6k.insforge.site`)
5. Click **Save**.

---

## Step 3: Wait for Propagation

DNS changes can take anywhere from a few minutes up to 24–48 hours to propagate globally (especially `.np` domain updates through Mercantile). Once propagated, the InsForge console will show the domain status as **Active**, and the site will be live at `https://pacenp.com`.
