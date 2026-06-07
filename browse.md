---
layout: default
title: Ramban
permalink: /ramban/
---

<header class="page-header">
  <p class="eyebrow">Jelajah kamus</p>
  <h1>Ramban</h1>
  <p class="lead">Telusuri entri berdasarkan urutan alfabet, bidang kajian, atau kategori istilah.</p>
</header>

{% assign sorted_terms = site.terms | sort_natural: "title" %}
{% assign alphabet_letters = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z" | split: "," %}

<nav class="browse-mode-nav" aria-label="Pilihan ramban">
  <a href="#alfabet">Jelajah Alfabet</a>
  <a href="#bidang">Jelajah Bidang</a>
  <a href="#kategori">Jelajah Kategori</a>
</nav>

<section id="alfabet" class="page-section">
  <div class="section-heading">
    <div>
      <p class="eyebrow">Jelajah alfabet</p>
      <h2>Alfabet</h2>
    </div>
  </div>

  <nav class="alphabet-nav" aria-label="Navigasi alfabet">
    {% for letter in alphabet_letters %}
      {% assign initial_count = 0 %}
      {% for initial_term in sorted_terms %}
        {% assign initial_term_initial = initial_term.initial | default: initial_term.title | slice: 0 | strip | upcase %}
        {% if initial_term_initial == letter %}
          {% assign initial_count = initial_count | plus: 1 %}
        {% endif %}
      {% endfor %}
      {% if initial_count > 0 %}
        <a href="#huruf-{{ letter | downcase }}">{{ letter }} <span class="browse-chip-count">({{ initial_count }})</span></a>
      {% endif %}
    {% endfor %}
  </nav>

  {% for letter in alphabet_letters %}
    {% assign initial_count = 0 %}
    {% for initial_term in sorted_terms %}
      {% assign initial_term_initial = initial_term.initial | default: initial_term.title | slice: 0 | strip | upcase %}
      {% if initial_term_initial == letter %}
        {% assign initial_count = initial_count | plus: 1 %}
      {% endif %}
    {% endfor %}

    {% if initial_count > 0 %}
      <h3 id="huruf-{{ letter | downcase }}">{{ letter }}</h3>
      <ul class="term-list">

      {% for term in sorted_terms %}
        {% assign sorted_term_initial = term.initial | default: term.title | slice: 0 | strip | upcase %}
        {% if sorted_term_initial == letter %}
          <li>
            <a href="{{ term.url | relative_url }}">{{ term.title }}</a>
            {% if term.senses.first.english %}
              <span class="meta">{{ term.senses.first.english | join: ", " }}</span>
            {% endif %}
          </li>
        {% endif %}
      {% endfor %}

      </ul>
    {% endif %}
  {% endfor %}
</section>

<section id="bidang" class="page-section">
  <div class="section-heading">
    <div>
      <p class="eyebrow">Jelajah bidang</p>
      <h2>Bidang</h2>
    </div>
  </div>

  <nav class="alphabet-nav browse-group-nav" aria-label="Navigasi bidang">
    {% for field in site.data.fields %}
      {% assign field_count = 0 %}
      {% for term in sorted_terms %}
        {% assign has_field = false %}
        {% for sense in term.senses %}
          {% if sense.fields contains field[0] %}
            {% assign has_field = true %}
          {% endif %}
        {% endfor %}
        {% if has_field %}
          {% assign field_count = field_count | plus: 1 %}
        {% endif %}
      {% endfor %}
      <a href="#bidang-{{ field[0] }}">{{ field[1].label }} <span class="browse-chip-count">({{ field_count }})</span></a>
    {% endfor %}
  </nav>

  {% for field in site.data.fields %}
    <h3 id="bidang-{{ field[0] }}">{{ field[1].label }}</h3>
    {% if field[1].description %}
      <p class="browse-group-description">{{ field[1].description }}</p>
    {% endif %}

    {% capture field_terms %}
      {% for term in sorted_terms %}
        {% assign has_field = false %}
        {% for sense in term.senses %}
          {% if sense.fields contains field[0] %}
            {% assign has_field = true %}
          {% endif %}
        {% endfor %}

        {% if has_field %}
          <li>
            <a href="{{ term.url | relative_url }}">{{ term.title }}</a>
            {% if term.senses.first.english %}
              <span class="meta">{{ term.senses.first.english | join: ", " }}</span>
            {% endif %}
          </li>
        {% endif %}
      {% endfor %}
    {% endcapture %}

    {% assign clean_field_terms = field_terms | strip %}
    {% if clean_field_terms != "" %}
      <ul class="term-list">{{ field_terms }}</ul>
    {% else %}
      <p class="empty-note">Belum ada entri untuk bidang ini.</p>
    {% endif %}
  {% endfor %}
</section>

<section id="kategori" class="page-section">
  <div class="section-heading">
    <div>
      <p class="eyebrow">Jelajah kategori</p>
      <h2>Kategori</h2>
    </div>
  </div>

  <nav class="alphabet-nav browse-group-nav" aria-label="Navigasi kategori">
    {% for category in site.data.categories %}
      {% assign category_count = 0 %}
      {% for term in sorted_terms %}
        {% assign has_category = false %}
        {% for sense in term.senses %}
          {% if sense.categories contains category[0] %}
            {% assign has_category = true %}
          {% endif %}
        {% endfor %}
        {% if has_category %}
          {% assign category_count = category_count | plus: 1 %}
        {% endif %}
      {% endfor %}
      <a href="#kategori-{{ category[0] }}">{{ category[1].label }} <span class="browse-chip-count">({{ category_count }})</span></a>
    {% endfor %}
  </nav>

  {% for category in site.data.categories %}
    <h3 id="kategori-{{ category[0] }}">{{ category[1].label }}</h3>
    {% if category[1].description %}
      <p class="browse-group-description">{{ category[1].description }}</p>
    {% endif %}

    {% capture category_terms %}
      {% for term in sorted_terms %}
        {% assign has_category = false %}
        {% for sense in term.senses %}
          {% if sense.categories contains category[0] %}
            {% assign has_category = true %}
          {% endif %}
        {% endfor %}

        {% if has_category %}
          <li>
            <a href="{{ term.url | relative_url }}">{{ term.title }}</a>
            {% if term.senses.first.english %}
              <span class="meta">{{ term.senses.first.english | join: ", " }}</span>
            {% endif %}
          </li>
        {% endif %}
      {% endfor %}
    {% endcapture %}

    {% assign clean_category_terms = category_terms | strip %}
    {% if clean_category_terms != "" %}
      <ul class="term-list">{{ category_terms }}</ul>
    {% else %}
      <p class="empty-note">Belum ada entri untuk kategori ini.</p>
    {% endif %}
  {% endfor %}
</section>
