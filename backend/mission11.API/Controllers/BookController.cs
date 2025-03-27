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
    }
}