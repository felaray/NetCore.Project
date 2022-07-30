using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCore.Project.Data;
using NetCore.Project.Models;
using NetCore.Project.Services;

namespace NetCore.Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoFilesController : ControllerBase
    {
        private readonly DBContext _context;
        private readonly IFileService _fileService;

        public TodoFilesController(DBContext context, IFileService file)
        {
            _context = context;
            _fileService = file;
        }

        // GET: api/TodoFiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoFile>>> GetTodoFile()
        {
            if (_context.TodoFile == null)
            {
                return NotFound();
            }
            return await _context.TodoFile.ToListAsync();
        }

        // GET: api/TodoFiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoFile>> GetTodoFile(int id)
        {
            if (_context.TodoFile == null)
            {
                return NotFound();
            }
            var todoFile = await _context.TodoFile.FindAsync(id);

            if (todoFile == null)
            {
                return NotFound();
            }

            return todoFile;
        }

        //// PUT: api/TodoFiles/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutTodoFile(int id, TodoFile todoFile)
        //{
        //    if (id != todoFile.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(todoFile).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TodoFileExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/TodoFiles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{id}")]
        public async Task<ActionResult<TodoFile>> PostTodoFile(int id, List<IFormFile> files)
        {
            var filePath = Path.Combine("File");
            var fileList = new List<TodoFile>();
            foreach (var file in files)
            {
                var url = await _fileService.Upload(filePath, file);
                fileList.Add(new TodoFile { Url = url });
            }

            _context.TodoFile.AddRange(fileList);
            await _context.SaveChangesAsync();

            return Ok();
        }

        //// DELETE: api/TodoFiles/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteTodoFile(int id)
        //{
        //    if (_context.TodoFile == null)
        //    {
        //        return NotFound();
        //    }
        //    var todoFile = await _context.TodoFile.FindAsync(id);
        //    if (todoFile == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.TodoFile.Remove(todoFile);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        private bool TodoFileExists(int id)
        {
            return (_context.TodoFile?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
