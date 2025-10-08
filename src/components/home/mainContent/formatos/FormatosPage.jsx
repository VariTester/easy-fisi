import { formatos_page } from "../../../../data";
import { useState, useEffect } from "react";
import "./formatosPage.css";
import Side from "../../sideContent/side/Side";

const FormatosPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Detectar ancho de pantalla para ajustar itemsPerPage
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 815) {
        setItemsPerPage(4); // 📱 en móvil
      } else {
        setItemsPerPage(6); // 💻 en desktop
      }
    };

    updateItemsPerPage(); // primera vez
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Filtrar formatos en base al texto de búsqueda
  const formatosDisponibles = formatos_page.flatMap(item =>
    item.formatos
      ? item.formatos.filter(val =>
          Object.keys(val).some(
            key =>
              key.startsWith("formato") &&
              val[key] &&
              val.nombre.toLowerCase().includes(search.toLowerCase())
          )
        )
      : []
  );

  // Paginación
  const totalPages = Math.ceil(formatosDisponibles.length / itemsPerPage);
  const currentItems = formatosDisponibles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Manejadores de página
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <main>
      <div className="containerfp">
        {/* Contenido principal */}
        <section className="mainContent detailsfp">
          {/* Barra de búsqueda estilizada */}
          <div className="search-containerfp">
            <input
              type="text"
              placeholder="🔍 Buscar formato..."
              className="search-bar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Paginación */}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Anterior
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <span
                key={index}
                className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </span>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </div>

          {/* Sección de formatos */}
          <div className="formatsfp">
            {currentItems.length > 0 ? (
              currentItems.map((val, index) => {
                const formatoKey = Object.keys(val).find((key) =>
                  key.startsWith("formato")
                );

                return (
                  <div key={index} className="text-containerLinksfp">
                    {formatoKey && val[formatoKey] ? (
                      <a href={val[formatoKey]} 
                      download = {`${val.nombre}.pdf`}
                      className="formato-linkfp">
                        {val.nombre}
                      </a>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <p>No hay formatos disponibles</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default FormatosPage;
