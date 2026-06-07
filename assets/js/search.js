(function () {
  const containers = document.querySelectorAll("[data-search]");

  if (!containers.length) {
    return;
  }

  const script = document.currentScript;
  const indexUrl = script ? script.getAttribute("data-search-index") : "/search.json";
  let indexPromise;

  function normalize(value) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function fetchIndex() {
    if (!indexPromise) {
      indexPromise = fetch(indexUrl).then(function (response) {
        if (!response.ok) {
          throw new Error("Search index unavailable");
        }

        return response.json();
      });
    }

    return indexPromise;
  }

  function scoreTerm(term, query) {
    const title = normalize(term.title);
    const english = normalize(term.english || "");
    const text = normalize(term.text || "");

    if (title === query) return 100;
    if (title.startsWith(query)) return 80;
    if (title.includes(query)) return 60;
    if (english.includes(query)) return 45;
    if (text.includes(query)) return 20;

    return 0;
  }

  function renderResults(container, results, query) {
    const list = container.querySelector("[data-search-results]");
    const status = container.querySelector("[data-search-status]");

    list.innerHTML = "";

    if (!query) {
      status.textContent = "";
      list.hidden = true;
      return;
    }

    if (!results.length) {
      status.textContent = "Tidak ada istilah yang cocok.";
      list.hidden = true;
      return;
    }

    status.textContent = results.length + " hasil ditemukan.";
    list.hidden = false;

    results.slice(0, 8).forEach(function (term) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const meta = document.createElement("span");

      link.href = term.url;
      link.textContent = term.title;
      meta.className = "meta";
      meta.textContent = term.english || term.summary || "Lihat entri";

      item.append(link, meta);
      list.append(item);
    });
  }

  containers.forEach(function (container) {
    const input = container.querySelector("input[type='search']");

    input.disabled = false;
    input.addEventListener("input", function () {
      const query = normalize(input.value);

      fetchIndex()
        .then(function (terms) {
          const results = terms
            .map(function (term) {
              return Object.assign({ score: scoreTerm(term, query) }, term);
            })
            .filter(function (term) {
              return term.score > 0;
            })
            .sort(function (a, b) {
              return b.score - a.score || a.title.localeCompare(b.title, "id");
            });

          renderResults(container, results, query);
        })
        .catch(function () {
          const status = container.querySelector("[data-search-status]");
          status.textContent = "Pencarian belum dapat dimuat.";
        });
    });
  });
})();
