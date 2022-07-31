using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using NetCore.Project.Data;
using NetCore.Project.Models;
using NetCore.Project.Services;
using System.Net.Mime;
using System.Text;

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

        [HttpPost("Attachment")]
        public async Task<ActionResult> Process([FromForm] int caseId, IFormFile filepond, CancellationToken cancellationToken)
        {
            if (filepond is null)
            {
                return BadRequest("Process Error: No file submitted");
            }

            // We do some internal application validation here with our caseId

            try
            {
                // get a guid to use as the filename as they're highly unique
                var guid = Guid.NewGuid().ToString();
                var newimage = string.Format("{0}.{1}", guid, filepond.FileName.Split('.').LastOrDefault());

                var filePath = Path.Combine("Files");

                filePath = await _fileService.Upload(filePath, filepond);

                if (filePath == null)
                    return BadRequest("檔案上傳失敗");

                var attachment = new Attachment
                {
                    FileName = Path.GetFileNameWithoutExtension(filepond.FileName),
                    FileType = Path.GetExtension(filepond.FileName).Replace(".", String.Empty),
                    FileSize = filepond.Length,
                    CreatedOn = DateTime.Now,
                    CaseId = caseId,
                    Guid = guid
                };
                await _context.AddAsync(attachment, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
                return Ok(guid);
            }
            catch (Exception e)
            {
                return BadRequest($"Process Error: {e.Message}"); // Oops!
            }
        }

        [HttpDelete("Attachment")]
        public async Task<ActionResult> Revert()
        {

            // The server id will be send in the delete request body as plain text
            using StreamReader reader = new(Request.Body, Encoding.UTF8);
            string guid = await reader.ReadToEndAsync();
            if (string.IsNullOrEmpty(guid))
            {
                return BadRequest("Revert Error: Invalid unique file ID");
            }
            var attachment = _context.Attachment.FirstOrDefault(i => i.Guid == guid);
            // We do some internal application validation here
            try
            {
                attachment.Deleted = true;
                _context.Update(attachment);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(string.Format("Revert Error:'{0}' when writing an object", e.Message));
            }
        }

        [HttpGet("attachment/{id}")]
        public async Task<IActionResult> Load(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return NotFound("Load Error: Invalid parameters");
            }
            var attachment = await _context.Attachment.SingleOrDefaultAsync(i => i.Guid.Equals(id));
            if (attachment is null)
            {
                return NotFound("Load Error: File not found");
            }

            var filePath = Path.Combine("File", attachment.FileName + "." + attachment.FileType);
            var bytes = System.IO.File.ReadAllBytes(filePath);
            var provider = new FileExtensionContentTypeProvider();
            var contentType = "";
            if (!provider.TryGetContentType(attachment.FileName, out contentType))
            {
                contentType = "image/" + attachment.FileType;
            }
            return File(bytes, contentType, Path.GetFileName(filePath));
        }


    }


}
