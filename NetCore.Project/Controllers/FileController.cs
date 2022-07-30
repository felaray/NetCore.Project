using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using NetCore.Project.Data;
using NetCore.Project.Services;

namespace NetCore.Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly DBContext _context;
        private readonly IFileService _fileService;

        public FileController(DBContext context, IFileService file)
        {
            _context = context;
            _fileService = file;
        }

        [HttpPost]
        public async Task<IActionResult> ReconnaissanceRecordFilePost(IFormFile model)
        {
            var filePath = Path.Combine("Files");

            filePath = await _fileService.Upload(filePath, model);

            if (filePath == null)
                return BadRequest("檔案上傳失敗");

            //_context.Todo.Add(new Todo);
            //await _context.SaveChangesAsync();

            return Ok(filePath);
        }

        [HttpGet("{fileName}")]
        public async Task<IActionResult> GetReconnaissanceRecordFile(string fileName)
        {
            var filePath = Path.Combine("Files", fileName);

            try
            {
                var bytes = System.IO.File.ReadAllBytes(filePath);
                var provider = new FileExtensionContentTypeProvider();
                var contentType = "";
                if (!provider.TryGetContentType(fileName, out contentType))
                {
                    contentType = "application/octet-stream";
                }
                return File(bytes, contentType, Path.GetFileName(filePath));
            }
            catch (Exception)
            {
                return NotFound();
            }

        }
    }


}
