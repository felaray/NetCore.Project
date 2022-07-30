﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NetCore.Project.Models;

namespace NetCore.Project.Data
{
    public class DBContext : DbContext
    {
        public DBContext (DbContextOptions<DBContext> options)
            : base(options)
        {
        }

        public DbSet<NetCore.Project.Models.Todo> Todo { get; set; } = default!;
        public DbSet<NetCore.Project.Models.TodoFile> TodoFile { get; set; } = default!;
    }
}