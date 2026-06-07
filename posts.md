---
layout: default
title: Berita
permalink: /berita/
---

<header class="page-header">
  <p class="eyebrow">Pembaruan</p>
  <h1>Berita</h1>
  <p class="lead">Pengumuman, catatan pemutakhiran, dan kabar lain seputar pengembangan Kamus Psikologi.</p>
</header>

{% assign month_names = "Januari,Februari,Maret,April,Mei,Juni,Juli,Agustus,September,Oktober,November,Desember" | split: "," %}

{% if site.posts.size > 0 %}
  <section class="post-list" aria-label="Daftar berita">
    {% for post in site.posts %}
      {% assign post_day = post.date | date: "%-d" %}
      {% assign post_month_number = post.date | date: "%-m" %}
      {% assign post_month_index = post_month_number | minus: 1 %}
      {% assign post_month_name = month_names[post_month_index] %}
      {% assign post_year = post.date | date: "%Y" %}

      <article class="post-list-item">
        <p class="meta">{{ post_day }} {{ post_month_name }} {{ post_year }}</p>
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        {% if post.post_categories %}
          {% assign post_category_values = post.post_categories | join: "||" | split: "||" %}
          <div class="post-category-chips" aria-label="Kategori berita">
            {% for post_category_key in post_category_values %}
              {% assign clean_post_category_key = post_category_key | strip %}
              {% assign post_category_meta = site.data.post_categories[clean_post_category_key] %}
              <span class="meta-chip post-category-chip" tabindex="0">
                {% if post_category_meta.label %}
                  {{ post_category_meta.label }}
                {% else %}
                  {{ clean_post_category_key | replace: "-", " " | capitalize }}
                {% endif %}
                {% if post_category_meta.description %}
                  <span class="chip-help" role="tooltip">{{ post_category_meta.description }}</span>
                {% endif %}
              </span>
            {% endfor %}
          </div>
        {% endif %}
        {% if post.excerpt %}
          <div class="post-excerpt">
            {{ post.excerpt | strip_html | truncatewords: 36 }}
          </div>
        {% endif %}
      </article>
    {% endfor %}
  </section>
{% else %}
  <section class="callout">
    <h2>Belum ada berita</h2>
    <p>Pengumuman dan catatan pemutakhiran akan ditampilkan di halaman ini setelah diterbitkan.</p>
  </section>
{% endif %}
