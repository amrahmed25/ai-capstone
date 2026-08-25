# DNS Walkthrough

## What DNS Does

DNS stands for **Domain Name System**. Its main job is to translate human-readable website addresses into the information needed to reach the correct server.

For example, when someone types:

`amrahmed.netlify.app`

into a browser, the computer needs to determine where that website is hosted. DNS provides the system that connects the domain name to the appropriate destination.

Without DNS, users would generally need to remember IP addresses instead of simple domain names.

---

## What Happens When Someone Visits My Website?

When someone enters my website address into their browser, several steps happen.

### 1. The Browser Checks Its Cache

The browser may already know the address information from a previous visit. If it does not have the answer, the request continues.

### 2. The DNS Resolver

The device sends a DNS request to a DNS resolver, usually provided by the user's internet service provider or another DNS service.

The resolver's job is to find the correct DNS information for the requested domain.

### 3. The Nameserver

If the resolver does not already have the answer cached, it communicates with the DNS infrastructure responsible for the domain.

The authoritative nameserver contains the DNS records for the domain and can provide the correct destination.

### 4. DNS Record

The nameserver returns the relevant DNS record.

For example, an **A record** can point a domain to an IP address.

A **CNAME record** points one domain name to another hostname.

For example:

`www.example.com → example.netlify.app`

The CNAME tells DNS that `www.example.com` should resolve through the hostname on the right.

---

## What Is a CNAME?

A CNAME means **Canonical Name**.

It is useful when I want one hostname to point to another hostname instead of directly specifying an IP address.

For example, if I eventually connect a custom domain to my Netlify site, I could configure a CNAME for a subdomain such as:

`www.mydomain.com`

that points to the hostname provided by my hosting provider.

This means I don't have to manually manage the hosting server's IP address in the CNAME record.

---

## What Happens After DNS Resolves?

Once the browser knows where the website is hosted, it connects to the server.

Because my website is hosted over HTTPS, the browser establishes a secure HTTPS connection with the host.

The host then responds with the website files, such as HTML, CSS, JavaScript, images, and other assets.

The browser downloads these files and renders the website on the screen.

So the simplified process is:

**Domain → DNS Resolver → Nameserver → DNS Record → Hosting Server → HTTPS Response → Browser Displays Website**

---

## Why This Matters

Before this assignment, I mostly thought of deployment as simply uploading a website and getting a URL.

Now I understand that there is infrastructure behind that URL.

The domain name is the human-friendly address, DNS helps find where that address should go, the hosting provider serves the website files, and HTTPS provides a secure connection between the visitor and the website.

This means that if I connect a custom domain in the future, I will understand what is happening instead of simply following a set of instructions without knowing why.
