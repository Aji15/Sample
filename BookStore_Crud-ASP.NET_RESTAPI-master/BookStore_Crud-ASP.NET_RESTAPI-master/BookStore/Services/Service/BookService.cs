using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStore.Models;
using BookStore.Services.Interface;
using System.Net;

namespace BookStore.Services.Service
{
    public class BookService:IBookService
    {
        private readonly IMongoCollection<Book> _book;
        public BookService(IBookStoreDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _book = database.GetCollection<Book>(settings.BooksCollectionName);

        }

        public async Task<List<Book>> Get()
        {
            return await  _book.Find(book => true).ToListAsync();
             
        }
        public async Task<CommonResponseDto> AddBook(Book addrequest)
        {
            CommonResponseDto response = new CommonResponseDto();
            await _book.InsertOneAsync(addrequest);
            response.Status = true;
            response.StatusCode = response.Status ? (int)HttpStatusCode.OK : (int)HttpStatusCode.BadRequest;
            response.MaxId = 0;
            return response;
        }
        public async Task<CommonResponseDto> UpdateBook(Book updaterequest)
        {
            CommonResponseDto response = new CommonResponseDto();
            await _book.ReplaceOneAsync(x=>x.Id==updaterequest.Id,updaterequest);
            response.Status = true;
            response.StatusCode = response.Status ? (int)HttpStatusCode.OK : (int)HttpStatusCode.BadRequest;
            response.MaxId = 0;
            return response;


        }
        public async Task<CommonResponseDto> DeleteBook(string id)
        {
            CommonResponseDto response = new CommonResponseDto();
            await _book.DeleteOneAsync(x => x.Id == id);
            response.Status = true;
            response.StatusCode = response.Status ? (int)HttpStatusCode.OK : (int)HttpStatusCode.BadRequest;
            response.MaxId = 0;
            return response;
        }

        public async Task<Book> GetById(string id) =>
           await _book.Find<Book>(book => book.Id == id).FirstOrDefaultAsync();

    }
}

