namespace NetCore.Project.Services
{
    public interface IFileService
    {
        public List<FileInfo> GetFiles(string path);
        public Task<string> Upload(string path, IFormFile formFile);
        public void Delete(string filePath);
        public bool FileExists(string filePath);
    }

    public class FileService : IFileService
    {
        public List<FileInfo> GetFiles(string path)
        {
            // Specify the directories you want to manipulate.
            DirectoryInfo di = new DirectoryInfo(path);
            Console.WriteLine(di.Exists);
            if (di.Exists)
            {

                var result = di.GetFiles().OrderBy(f => f.CreationTime).ToList();
                return result;
            }
            else
                return null;
        }

        public async Task<string> Upload(string path, IFormFile formFile)
        {

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            var filePath = Path.Combine(path, formFile.FileName);
            //path +"/" Path.GetTempFileName();

            //if (System.IO.File.Exists(filePath)) { 
            //    filePath = Path.Combine(path, formFile.FileName);
            //}

            using (var stream = System.IO.File.Create(filePath))
            {
                await formFile.CopyToAsync(stream);
            }

            return filePath;

            // Process uploaded files
            // Don't rely on or trust the FileName property without validation.

            //return Ok(new { count = files.Count, size });
        }


        public void Delete(string filePath)
        {
            System.IO.File.Delete(filePath);
        }

        public bool FileExists(string filePath)
        {
            return System.IO.File.Exists(filePath);
        }

    }
}
