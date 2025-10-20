# Font & Color Guide

## 🎨 Color Palette

### Primary Colors

| Name      | Hex Code  |
|-----------|-----------|
| **Teal**  | `#4C9A84` |
| **Coral** | `#FF6857` |
| **Dark**  | `#1E1E1E` |
| **Light** | `#F4F4F4` | 

### Tailwind Usage

```tsx
// Backgrounds
<div className="bg-teal">
<div className="bg-coral">
<div className="bg-dark">
<div className="bg-light">

// Text
<p className="text-teal">
<p className="text-coral">
<p className="text-dark">
<p className="text-light">

// Borders
<div className="border border-teal">
```

---

## 🔤 Typography - Montserrat

### Typography Overview

| Element    | Size  | Weight         | Line Height | HTML/Class               |
|------------|-------|----------------|-------------|--------------------------|
| **H1**     | 48px  | Bold (700)     | 56.4px      | `<h1>`                   |
| **H2**     | 32px  | Regular (400)  | -           | `<h2>`                   |
| **H3**     | 24px  | Regular (400)  | -           | `<h3>`                   |
| **H4**     | 18px  | Bold (700)     | -           | `<h4>`                   |
| Paragraph  | 18px  | Regular (400)  | -           | `<p>`                    |
| Menu       | 16px  | Regular (400)  | -           | `.text-menu`             |
| Button     | 14px  | Bold (700)     | -           | `.text-button`           |
| Span       | 12px  | Regular (400)  | -           | `<span>`                 |

### Heading Hierarchy

#### Heading 1
- **Font**: Montserrat Bold
- **Size**: 48px
- **Line Height**: 56.4px
- **Usage**: Main titles, hero sections
- **HTML**: `<h1>My title</h1>`
- **Weight**: 700 (Bold)

#### Heading 2
- **Font**: Montserrat
- **Size**: 32px
- **Usage**: Main section subtitles
- **HTML**: `<h2>My subtitle</h2>`

#### Heading 3
- **Font**: Montserrat
- **Size**: 24px
- **Usage**: Subsection titles
- **HTML**: `<h3>Section title</h3>`

#### Heading 4
- **Font**: Montserrat Bold
- **Size**: 18px
- **Usage**: Card titles, small headings
- **HTML**: `<h4>Small title</h4>`
- **Weight**: 700 (Bold)

---

### Text Elements

#### Paragraph
- **Font**: Montserrat
- **Size**: 18px
- **Usage**: Main body text
- **HTML**: `<p>My paragraph text.</p>`

#### Menu
- **Font**: Montserrat
- **Size**: 16px
- **Usage**: Navigation, menu links
- **Class**: `className="text-menu"`

#### Button
- **Font**: Montserrat Bold
- **Size**: 14px
- **Usage**: Button labels
- **Class**: `className="text-button"`
- **Weight**: 700 (Bold)

#### Span
- **Font**: Montserrat
- **Size**: 12px
- **Usage**: Small text, labels, badges
- **HTML**: `<span>Small text</span>`

---

## 📦 Available Font Weights

| Weight    | Value  | Tailwind Class   | Usage                    |
|-----------|--------|------------------|--------------------------|
| Regular   | 400    | `font-normal`    | Standard text            |
| Medium    | 500    | `font-medium`    | Slightly emphasized      |
| SemiBold  | 600    | `font-semibold`  | Important text           |
| Bold      | 700    | `font-bold`      | Headings, strong emphasis|

---

## 💡 Usage Examples

### Primary Button
```tsx
<button className="bg-teal text-light text-button font-medium px-6 py-3 rounded">
  Click here
</button>
```

### Accent Button
```tsx
<button className="bg-coral text-light text-button font-medium px-6 py-3 rounded">
  Important action
</button>
```

### Navigation
```tsx
<nav className="bg-dark">
  <a href="/" className="text-menu text-light hover:text-teal">
    Home
  </a>
</nav>
```

### Card with Title
```tsx
<div className="bg-light p-6 rounded">
  <h4 className="text-dark mb-4">Card title</h4>
  <p className="text-dark">Card description with some text.</p>
  <span className="text-teal">Small label</span>
</div>
```

### Hero Section
```tsx
<section className="bg-teal text-light py-20">
  <h1>Welcome to our site</h1>
  <p className="mt-4">A captivating description</p>
  <button className="bg-coral text-light text-button mt-8">
    Get started
  </button>
</section>
```

---

## 🖼️ Images & Icons

### File Structure
```
public/
├── fonts/
│   └── img/
│       ├── 1200x1200.png
│       ├── Icon nos valeur.svg
│       ├── icon nos valeurs_2.svg
│       ├── Icon notre mission.svg
│       ├── Img Hero.png
│       ├── Img section besion d_une ressource.png
│       ├── Img section transaction.png
│       ├── Logo footer.svg
│       ├── Logo header.svg
│       └── Logo now valeurs.svg
```

### Next.js Image Usage
```tsx
import Image from "next/image";

<Image
  src="/fonts/img/Logo header.svg"
  alt="Logo"
  width={200}
  height={50}
/>
```

---

## 📝 Notes

- All font sizes are in **fixed pixels**
- **Montserrat** font is loaded locally from `public/fonts/`
- Colors are defined in `app/globals.css` using Tailwind v4 theme
- Typography is automatically applied to standard HTML tags

