---
layout: default
title: Kamus Psikologi
---

<section class="hero">
  <div class="hero-brand">
    <img class="hero-logo" src="{{ '/assets/images/kamus-psikologi_logo.png' | relative_url }}" alt="" width="1087" height="1308">
    <div class="hero-copy">
      <p class="eyebrow">Kamus terbuka</p>
      <h1>Kamus Psikologi Indonesia</h1>
      <p class="lead">
        Rujukan istilah psikologi berbahasa Indonesia untuk menemukan definisi, padanan bahasa Inggris, bidang kajian, dan catatan penggunaan secara ringkas.
      </p>
    </div>
  </div>

  <div class="button-row">
    <a class="button" href="{{ '/ramban/' | relative_url }}">Ramban istilah</a>
    <a class="button secondary" href="{{ '/masukan/' | relative_url }}">Beri masukan</a>
  </div>
</section>

<section class="term-search" data-search aria-label="Pencarian istilah">
  <label for="home-search">Cari istilah</label>
  <input id="home-search" type="search" placeholder="Ketik istilah, padanan Inggris, atau kata kunci" autocomplete="off">
  <p class="search-status" data-search-status aria-live="polite"></p>
  <ul class="search-results" data-search-results hidden></ul>
</section>

{% assign sorted_terms = site.terms | sort: "title" %}
{% assign recent_terms = site.terms | sort: "date_added" | reverse %}
{% assign today = site.time | date: "%Y-%m-%d" %}
{% assign current_month_number = site.time | date: "%-m" %}
{% assign current_year = site.time | date: "%Y" %}
{% assign month_names = "Januari,Februari,Maret,April,Mei,Juni,Juli,Agustus,September,Oktober,November,Desember" | split: "," %}
{% assign current_month_index = current_month_number | minus: 1 %}
{% assign current_month_name = month_names[current_month_index] %}
{% assign monthly_highlight = nil %}
{% assign highlighted_term = nil %}
{% assign highlighted_sense = nil %}

{% for highlight in site.data.highlights.word_of_month %}
  {% assign start_date = highlight.start_date | date: "%Y-%m-%d" %}
  {% assign end_date = highlight.end_date | date: "%Y-%m-%d" %}

  {% if start_date <= today %}
    {% if highlight.end_date == nil or end_date >= today %}
      {% assign monthly_highlight = highlight %}
    {% endif %}
  {% endif %}
{% endfor %}

{% if monthly_highlight %}
  {% for term in site.terms %}
    {% if term.term_id == monthly_highlight.term_id %}
      {% assign highlighted_term = term %}
    {% endif %}
  {% endfor %}

  {% if highlighted_term %}
    {% for sense in highlighted_term.senses %}
      {% if sense.def_idx == monthly_highlight.def_idx %}
        {% assign highlighted_sense = sense %}
      {% endif %}
    {% endfor %}
  {% endif %}
{% endif %}

<section class="highlight-grid" aria-label="Sorotan istilah">
  <article class="highlight-card">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Sorotan</p>
        <h2>Istilah terbaru</h2>
      </div>
      <a href="{{ '/ramban/' | relative_url }}">Semua</a>
    </div>

    <ul class="term-list">
      {% for term in recent_terms limit: 5 %}
        <li>
          <a href="{{ term.url | relative_url }}">{{ term.title }}</a>
          {% if term.date_added %}
            <span class="meta">Ditambahkan {{ term.date_added | date: "%d %b %Y" }}</span>
          {% endif %}
        </li>
      {% endfor %}
    </ul>
  </article>

  <article class="highlight-card">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Istilah bulan ini</p>
        <h2>{{ current_month_name }} {{ current_year }}</h2>
      </div>
    </div>

    {% if highlighted_term and highlighted_sense %}
      <div class="monthly-term">
        <h3><a href="{{ highlighted_term.url | relative_url }}">{{ highlighted_term.title }}</a></h3>

        {% if highlighted_sense.english %}
          <p class="meta">Padanan Inggris: <em>{{ highlighted_sense.english | join: ", " }}</em></p>
        {% endif %}

        {% if highlighted_sense.definition %}
          <div class="definition">
            {{ highlighted_sense.definition | markdownify }}
          </div>
        {% endif %}
      </div>
    {% else %}
      <p class="empty-note">Belum ada istilah pilihan bulan ini.</p>
    {% endif %}
  </article>
</section>

<section class="summary-card summary-card-wide" aria-label="Ringkasan entri">
  <div>
    <p class="eyebrow">Ringkasan</p>
    <strong class="total-entry-count">{{ site.terms | size }}</strong>
    <span>Total entri</span>
    <a class="button summary-action" href="{{ '/masukan/' | relative_url }}">Beri masukan</a>
  </div>

  <dl class="status-breakdown">
    {% for status_data in site.data.status %}
      {% assign status_key = status_data[0] %}
      {% assign status_meta = status_data[1].first %}
      {% assign status_count = 0 %}

      {% for term in sorted_terms %}
        {% if term.status == status_key %}
          {% assign status_count = status_count | plus: 1 %}
        {% endif %}
      {% endfor %}

      <div>
        <dt>{{ status_meta.label | default: status_key }}</dt>
        <dd>{{ status_count }}</dd>
      </div>
    {% endfor %}
  </dl>
</section>
