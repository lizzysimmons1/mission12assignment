using Microsoft.EntityFrameworkCore;
using mission11.API.Data;

namespace mission11.API.Data;

public class BookDbContext : DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
    }
    
    public DbSet<Book> Books { get; set; }
}