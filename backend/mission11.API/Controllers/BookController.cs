using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mission11.API.Data;

namespace mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("AllBooks")]
		public IActionResult Get(
    		int pageHowMany = 5, 
    		int pageNum = 1, 
    		[FromQuery] List<string>? BookCategories = null)
		{
    		IQueryable<Book> query = _bookContext.Books.AsQueryable();

    		if (BookCategories != null && BookCategories.Any())
    		{
        		query = query.Where(b => BookCategories.Contains(b.Category)); // Ensure BookCategory exists in Book model
    		}

    		var totalNumBooks = query.Count();

   			var books = query
        		.Skip((pageNum - 1) * pageHowMany)
        		.Take(pageHowMany)
        		.ToList();

    		return Ok(new
    		{
        		Books = books,
        		TotalNumBooks = totalNumBooks
    		});
		}
		[HttpGet("GetBookCategories")]
		public IActionResult GetBookCategories ()
		{
			var bookCategories = _bookContext.Books
				.Select(b => b.Category)
				.Distinct()
				.ToList();

			return Ok(bookCategories);
		}

		[HttpPost("AddBook")]
		public IActionResult AddBook([FromBody] Book newBook)
		{
			_bookContext.Books.Add(newBook);
			_bookContext.SaveChanges();
			return Ok(newBook);
		}

		
		[HttpPut("UpdateBook/{bookId}")]
		public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
		{
			var existingBook = _bookContext.Books.Find(bookId);

			existingBook.Title = updatedBook.Title;
			existingBook.Author = updatedBook.Author;
			existingBook.Publisher = updatedBook.Publisher;
			existingBook.ISBN = updatedBook.ISBN;
			existingBook.Classification = updatedBook.Classification;
			existingBook.Category = updatedBook.Category;
			existingBook.PageCount = updatedBook.PageCount;
			existingBook.Price = updatedBook.Price;
			
			_bookContext.Books.Update(existingBook);
			_bookContext.SaveChanges();

			return Ok(existingBook);
		}

		[HttpDelete("DeleteBook/{bookId}")]
		public IActionResult DeleteBook(int bookId)
		{
			var book = _bookContext.Books.Find(bookId);

			if (book == null)
			{
				return NotFound(new {message = "Book not found"});
			}

			_bookContext.Books.Remove(book);
			_bookContext.SaveChanges();

			return NoContent();
		}
    }
}