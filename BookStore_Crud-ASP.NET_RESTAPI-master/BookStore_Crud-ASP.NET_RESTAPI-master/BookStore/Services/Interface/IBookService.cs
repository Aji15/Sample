using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStore.Models;

namespace BookStore.Services.Interface
{
    public interface IBookService
    {
        Task<List<Book>> Get();
        Task<CommonResponseDto> AddBook(Book addrequest);
        Task<CommonResponseDto> UpdateBook(Book updaterequest);
        Task<CommonResponseDto> DeleteBook(string id);
        Task<Book> GetById(string id);
    }
}
