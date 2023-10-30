package com.wallet_templete;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import android.Manifest;
import android.content.ContentResolver;
import android.content.Context;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Log;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.core.content.ContextCompat;

public class TimeZip {
    public static String zipToMC(Context context, String baseFilename, String sourcePath) {
        try {
            String archiveFilename = baseFilename;
            // Check if the sourcePath starts with "content://"
            if (sourcePath.startsWith("content://")) {
                // Use the method to get the real file path
                Uri contentUri = Uri.parse(sourcePath);
                sourcePath = RealPathUtil.getRealPath(context, contentUri);
            }

            File sourceFile = new File(sourcePath);
            File archiveFile = new File(archiveFilename);

            if (sourceFile.exists()) {
                ZipOutputStream outputStream = new ZipOutputStream(new FileOutputStream(archiveFile));

                if (sourceFile.isFile()) {
                    ZipEntry entry = new ZipEntry(sourceFile.getName());
                    outputStream.putNextEntry(entry);
                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    FileInputStream fileInputStream = new FileInputStream(sourceFile);
                    while ((bytesRead = fileInputStream.read(buffer)) != -1) {
                        outputStream.write(buffer, 0, bytesRead);
                    }
                    outputStream.closeEntry();
                } else if (sourceFile.isDirectory()) {
                    int sourcePathLength = sourceFile.getAbsolutePath().length() + 1;
                    File[] files = sourceFile.listFiles();
                    if (files != null) {
                        for (File file : files) {
                            if (file.getAbsolutePath().length() > sourcePathLength) {
                                String entryName = file.getAbsolutePath().substring(sourcePathLength);
                                ZipEntry entry = new ZipEntry(entryName);
                                outputStream.putNextEntry(entry);
                                if (!file.isDirectory()) {
                                    byte[] buffer = new byte[1024];
                                    int bytesRead;
                                    FileInputStream fileInputStream = new FileInputStream(file);
                                    while ((bytesRead = fileInputStream.read(buffer)) != -1) {
                                        outputStream.write(buffer, 0, bytesRead);
                                    }
                                }
                                outputStream.closeEntry();
                            }
                        }
                    }
                } else {
                    throw new IllegalArgumentException("Source must be a valid file or directory.");
                }

                outputStream.close();
                Toast.makeText(context.getApplicationContext(), "Zip successful", Toast.LENGTH_LONG).show();
                return archiveFile.getAbsolutePath(); // Return the path of the zipped file
            } else {
                throw new IllegalArgumentException("Source path does not exist.");
            }
        } catch (IOException e) {
            Toast.makeText(context.getApplicationContext(), e.getMessage(), Toast.LENGTH_LONG).show();
        }
        return baseFilename;
    }

    public static void unzipMC(Context context, String baseFilename, String extractPath) {
        try {
            String archiveFilename = baseFilename;
            File archiveFile = new File(archiveFilename);
            File targetDirectory = new File(extractPath);

            if (!targetDirectory.toString().contains("..")) {
                if (!targetDirectory.exists()) {
                    targetDirectory.mkdirs();
                }

                ZipInputStream zipInputStream = new ZipInputStream(new FileInputStream(archiveFile));
                ZipEntry entry;

                while ((entry = zipInputStream.getNextEntry()) != null) {
                    if (!entry.getName().startsWith("/") && !entry.getName().contains("..")) {
                        File entryFile = new File(targetDirectory, entry.getName());

                        if (entry.isDirectory()) {
                            entryFile.mkdirs();
                        } else {
                            File parentDir = entryFile.getParentFile();
                            if (!parentDir.exists()) {
                                parentDir.mkdirs();
                            }

                            FileOutputStream output = new FileOutputStream(entryFile);
                            byte[] buffer = new byte[1024];
                            int len;

                            while ((len = zipInputStream.read(buffer)) > 0) {
                                output.write(buffer, 0, len);
                            }

                            output.close();
                        }
                    } else {
                        throw new IllegalArgumentException("Invalid file path in the ZIP archive.");
                    }
                }

                zipInputStream.close();
            } else {
                throw new IllegalArgumentException("Invalid extractPath.");
            }
        } catch (IOException e) {
            Toast.makeText(context.getApplicationContext(), e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }

//    public static String getRealPathFromContentURI(Context context, Uri contentUri) {
//        String[] projection = {MediaStore.Files.FileColumns.DATA};
//        String selection = null;
//        String[] selectionArgs = null;
//
//        ContentResolver contentResolver = context.getContentResolver();
//
//        if (contentUri.getScheme().equals("content")) {
//            // Handle content URIs
//            selection = MediaStore.Images.Media._ID + "=?";
//            selectionArgs = new String[] { contentUri.getLastPathSegment() };
//        } else if (contentUri.getScheme().equals("file")) {
//            // Handle file URIs (no need to query)
//            return contentUri.getPath();
//        }
//
//        Cursor cursor = contentResolver.query(contentUri, projection, selection, selectionArgs, null);
//
//        if (cursor != null) {
//            int columnIndex = cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns.DATA);
//            cursor.moveToFirst();
//            String filePath = cursor.getString(columnIndex);
//            cursor.close();
//            return filePath;
//        }
//
//        return null;
//    }
public static List<String> listFilesWithExtension(String directoryPath, String extension) {
    List<String> matchingFiles = new ArrayList<>();
    File directory = new File(directoryPath);

    if (directory.exists() && directory.isDirectory()) {
        findFilesWithExtension(directory, extension, matchingFiles);
    }

    return matchingFiles;
}
    private static void findFilesWithExtension(File directory, String extension, List<String> matchingFiles) {
        File[] files = directory.listFiles();

        if (files != null) {
            for (File file : files) {
                if (file.isFile() && file.getName().endsWith(extension)) {
                    matchingFiles.add(file.getAbsolutePath());
                } else if (file.isDirectory()) {
                    // Recursively search in subdirectories
                    findFilesWithExtension(file, extension, matchingFiles);
                }
            }
        }
    }

public static boolean checkPermission(Context context){
    int r = ContextCompat.checkSelfPermission(context,Manifest.permission.READ_EXTERNAL_STORAGE);
    int w = ContextCompat.checkSelfPermission(context,Manifest.permission.WRITE_EXTERNAL_STORAGE);
    String message = r + ", " + w + ", ";
    Toast.makeText(context.getApplicationContext(),message,Toast.LENGTH_LONG).show();
    return r==w & w==PackageManager.PERMISSION_GRANTED;
}

}
