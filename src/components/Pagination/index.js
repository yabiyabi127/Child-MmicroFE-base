import React from 'react';
import { Icon } from 'antd';

const Index = ({ page, setPage, totalPage }) => (
  <div className='d-flex flex-column justify-content-center align-items-center flex-wrap p-2 mt-5'>
    <div>
      Halaman {page} dari {totalPage} halaman
    </div>


    <ul className='pagination'>
      <li
        className={page === 1 ? 'page-item previous disabled' : 'page-item previous'}
        onClick={() => (page === 1 ? null : setPage(page - 1))}
      >
        <a href='#' className='page-link'> 
         <Icon type="caret-left" />
        </a>
      </li>


      {totalPage <= 4 ? (
        <>
          {Array.from(Array(totalPage), (_, i) => (
            <li
              className={`page-item ${page === i + 1 ? 'active' : ''}`}
              key={i}
              onClick={() => setPage(i + 1)}
            >
              <a href='#' className='page-link'>
                {i + 1}
              </a>
            </li>
          ))}
        </>
      ) : (
        <>
          {page > 2 && (
            <li className='page-item' onClick={() => setPage(1)}>
              <a href='#' className='page-link'>
                1
              </a>
            </li>
          )}
          {page > 3 && (
            <li className='page-item disabled'>
              <a href='#' className='page-link'>
                ...
              </a>
            </li>
          )}
          <li
            className={`page-item ${page === 1 ? 'active' : ''}`}
            onClick={() => {
              let goToPage = 0;
              if (page === 1) {
                goToPage = 1;
              } else if (page === totalPage) {
                goToPage = page - 2;
              } else {
                goToPage = page - 1;
              }
              setPage(goToPage);
            }}
          >
            <a href='#' className='page-link'>
              {page === 1 ? page : page === totalPage ? page - 2 : page - 1}
            </a>
          </li>
          <li
            className={`page-item ${page !== 1 && page !== totalPage ? 'active' : ''}`}
            onClick={() => {
              let goToPage = 0;
              if (page === 1) {
                goToPage = page + 1;
              } else if (page === totalPage) {
                goToPage = page - 1;
              } else {
                goToPage = page;
              }
              setPage(goToPage);
            }}
          >
            <a href='#' className='page-link'>
              {page === 1 ? page + 1 : page === totalPage ? page - 1 : page}
            </a>
          </li>
          <li
            className={`page-item ${page === totalPage ? 'active' : ''}`}
            onClick={() => {
              let goToPage = 0;
              if (page === 1) {
                goToPage = page + 2;
              } else if (page === totalPage) {
                goToPage = page;
              } else {
                goToPage = page + 1;
              }
              setPage(goToPage);
            }}
          >
            <a href='#' className='page-link'>
              {page === 1 ? page + 2 : page === totalPage ? page : page + 1}
            </a>
          </li>
          {page <= totalPage - 3 && (
            <li className='page-item disabled'>
              <a href='#' className='page-link'>
                ...
              </a>
            </li>
          )}
          {page < totalPage - 1 && (
            <li className='page-item' onClick={() => setPage(totalPage)}>
              <a href='#' className='page-link'>
                {totalPage}
              </a>
            </li>
          )}
        </>
      )}

      <li
        className={page === totalPage ? 'page-item next disabled' : 'page-item next'}
        onClick={() => (page === totalPage ? null : setPage(page + 1))}
      >
        <a href='#' className='page-link'>
          <Icon type="caret-right" />
        </a>
      </li>
    </ul>
  </div>
);

export default Index;
